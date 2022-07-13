/* eslint-disable node/no-missing-import */
import MerkleTree from "./merkle-tree";
import { BigNumber, utils } from "ethers";

export default class BalanceTree {
  private readonly tree: MerkleTree;

  constructor(Ids: { account: string; ids: BigNumber[] | string[] }[], bigNumberish: boolean) {
    this.tree = new MerkleTree(
      Ids.map(({ account, ids }, index) => {
        return BalanceTree.toNode(index, account, ids, bigNumberish);
      })
    );
  }

  public static verifyProof(
    index: number | BigNumber,
    account: string,
    Ids: BigNumber[] | string[],
    proof: Buffer[],
    root: Buffer,
    bigNumberish: boolean
  ): boolean {
    let pair = BalanceTree.toNode(index, account, Ids, bigNumberish);
    for (const item of proof) {
      pair = MerkleTree.combinedHash(pair, item);
    }

    return pair.equals(root);
  }

  // keccak256(abi.encode(index, account, amount))
  public static toNode(
    index: number | BigNumber,
    account: string,
    ids: BigNumber[] | string[],
    bigNumberish: boolean
  ): Buffer {

    if(!bigNumberish) {
        return Buffer.from(
          utils
            .solidityKeccak256(
              ["uint256", "address", "string[]"],
              [index, account, ids]
            )
            .substr(2),
          "hex"
        );
    } else {
      return  Buffer.from(
        utils
          .solidityKeccak256(
            ["uint256", "address", "uint256[]"],
            [index, account, ids]
          )
          .substr(2),
        "hex"
      );
    }

  }

  public getHexRoot(): string {
    return this.tree.getHexRoot();
  }

  // returns the hex bytes32 values of the proof
  public getProof(
    index: number | BigNumber,
    account: string,
    ids: BigNumber[] | string[],
    bigNumberish: boolean
  ): string[] {
    return this.tree.getHexProof(BalanceTree.toNode(index, account, ids, bigNumberish));
  }
}
