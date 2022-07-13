/* eslint-disable node/no-missing-import */
import { isBigNumberish } from "@ethersproject/bignumber/lib/bignumber";
import { BigNumber, utils } from "ethers";
import BalanceTree from "./balance-tree";

const { isAddress, getAddress } = utils;

// This is the blob that gets distributed and pinned to IPFS.
// It is completely sufficient for recreating the entire merkle tree.
// Anyone can verify that all air drops are included in the tree,
// and the tree has no additional distributions.
interface MerkleDistributorInfo {
  merkleRoot: string;
  totalAmount: string;
  claims: {
    [account: string]: {
      index: number;
      Ids: string[];
      proof: string[];
    };
  };
}

type OldFormat = { [account: string]: number | string };
type ArrayFormat = { [account: string]: string[] };
type NewFormat = { address: string; values: string[] };

export function parseBalanceMap(
  asset: ArrayFormat | OldFormat
): MerkleDistributorInfo {
  // recombine the data format
  // const NewFormatAsset = Array.isArray(asset)
  //   ? asset
  //   : Object.keys(asset).map(
  //       (key, index) => (key = Object.values(asset)[index].toString())
  //     );
  // console.log(NewFormatAsset);
  let bigNumberish: boolean = true;

  const assetInNewFormat: NewFormat[] = Object.keys(asset).map(
    (account, index): NewFormat => ({
      address: account,
      values: !Array.isArray(asset[account])
      ? [Object.values(asset)[index].toString()]
      : Object.values(asset)[index],
    })
  );

  const dataByAddress = assetInNewFormat.reduce<{
    [address: string]: {
      Ids: BigNumber[] | string[];
    };
  }>((memo, { address: account, values }) => {
    if (!isAddress(account)) {
      throw new Error(`Found invalid address: ${account}`);
    }
    const parsed = getAddress(account);
    if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`);

    let parsedArray: string[] | BigNumber[] = [];


    for(let i in values) {
      if(!isBigNumberish(values[i])) {
        bigNumberish = false;
        break;
      }
    }

    if(bigNumberish) {
      parsedArray = values.map((id) => BigNumber.from(id));

      parsedArray.forEach((id) => {
        if (id.lte(0)) {
          throw new Error(`Invalid ids for account: ${account}`);
        }
      });
    } else {
      parsedArray = values;
    }

    memo[parsed] = { Ids: parsedArray };
    
    return memo;
  }, {});

  const sortedAddresses = Object.keys(dataByAddress).sort();

  // construct a tree
  const tree = new BalanceTree(
    sortedAddresses.map((address) => ({
      account: address,
      ids: dataByAddress[address].Ids,
    })),
    bigNumberish
  );
  
  // generate claims
  const claims = sortedAddresses.reduce<{
    [address: string]: {
      index: number;
      Ids: string[];
      proof: string[];
    };
  }>((memo, address, index) => {
    // console.log(bigNumberish)
    const ids = dataByAddress[address].Ids;
    memo[address] = {
      index,
      Ids: bigNumberish? ids.map((id) => BigNumber.from(id).toString()): ids.map((id) => id.toString()),
      proof: tree.getProof(index, address, ids, bigNumberish),
    };

    return memo;
  }, {});

  const totalAmount: BigNumber = sortedAddresses.reduce<BigNumber>(
    (memo, key) => memo.add(dataByAddress[key].Ids.length),
    BigNumber.from(0)
  );

  return {
    merkleRoot: tree.getHexRoot(),
    totalAmount: totalAmount.toHexString(),
    claims,
  };
}