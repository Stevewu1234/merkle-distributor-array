import { generateMerkleTree } from './scripts/generate-merkle-root';

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

export const merkletree_generator = (originalpath: string, generatedpath: string): MerkleDistributorInfo => {
  return generateMerkleTree(originalpath, generatedpath);
};
