/* eslint-disable node/no-missing-import */
import { BigNumber, utils } from "ethers";
import BalanceTree from "./balance-tree";

const { isAddress, getAddress } = utils;

// This is the blob that gets distributed and pinned to IPFS.
// It is completely sufficient for recreating the entire merkle tree.
// Anyone can verify that all air drops are included in the tree,
// and the tree has no additional distributions.
interface MerkleDistributorInfo {
  merkleRoot: string;
  totalLands: string;
  claims: {
    [account: string]: {
      index: number;
      Ids: string[];
      proof: string[];
    };
  };
}

type OldFormat = { [account: string]: number | string };
type Format = { [account: string]: string[] };
type NewFormat = { address: string; locationIds: string[] };

export function parseBalanceMap(
  asset: Format | OldFormat
): MerkleDistributorInfo {
  // recombine the data format
  // const NewFormatAsset = Array.isArray(asset)
  //   ? asset
  //   : Object.keys(asset).map(
  //       (key, index) => (key = Object.values(asset)[index].toString())
  //     );
  // console.log(NewFormatAsset);

  const assetInNewFormat: NewFormat[] = Object.keys(asset).map(
    (account, index): NewFormat => ({
      address: account,
      locationIds: Array.isArray(asset)
        ? Object.values(asset)[index]
        : [Object.values(asset)[index].toString()],
    })
  );

  const dataByAddress = assetInNewFormat.reduce<{
    [address: string]: {
      Ids: BigNumber[];
    };
  }>((memo, { address: account, locationIds }) => {
    if (!isAddress(account)) {
      throw new Error(`Found invalid address: ${account}`);
    }
    const parsed = getAddress(account);
    if (memo[parsed]) throw new Error(`Duplicate address: ${parsed}`);

    const parsedNumArray = locationIds.map((id) => BigNumber.from(id));
    parsedNumArray.forEach((id) => {
      if (id.lte(0)) {
        throw new Error(`Invalid ids for account: ${account}`);
      }
    });

    memo[parsed] = { Ids: parsedNumArray };
    return memo;
  }, {});

  const sortedAddresses = Object.keys(dataByAddress).sort();

  // construct a tree
  const tree = new BalanceTree(
    sortedAddresses.map((address) => ({
      account: address,
      ids: dataByAddress[address].Ids,
    }))
  );

  // generate claims
  const claims = sortedAddresses.reduce<{
    [address: string]: {
      index: number;
      Ids: string[];
      proof: string[];
    };
  }>((memo, address, index) => {
    const ids = dataByAddress[address].Ids;
    memo[address] = {
      index,
      Ids: ids.map((id) => BigNumber.from(id).toString()),
      proof: tree.getProof(index, address, ids),
    };

    return memo;
  }, {});

  const totalLands: BigNumber = sortedAddresses.reduce<BigNumber>(
    (memo, key) => memo.add(dataByAddress[key].Ids.length),
    BigNumber.from(0)
  );

  return {
    merkleRoot: tree.getHexRoot(),
    totalLands: totalLands.toHexString(),
    claims,
  };
}
