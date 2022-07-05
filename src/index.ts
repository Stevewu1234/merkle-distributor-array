import { generateMerkleTree } from '../scripts/generate-merkle-root';

export const merkletree_generator = (originalpath: string, generatedpath: string) => {
  generateMerkleTree(originalpath, generatedpath);
};
