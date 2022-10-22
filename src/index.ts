import { generateMerkleTree, MerkleDistributorInfo } from './scripts/generate-merkle-root';

export const merkletree_generator = (originalpath: string, generatedpath: string): MerkleDistributorInfo => {
  return generateMerkleTree(originalpath, generatedpath);
};
export { MerkleDistributorInfo };
