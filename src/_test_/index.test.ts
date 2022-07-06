import { merkletree_generator } from '../index';
import path from 'path';

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

test('test merkle generator', () => {
    const originalpath = path.join(__dirname, '../../data/example_format_1.json');
    const generatedPath = path.join(__dirname, '../../data/result.json');
    const merkleResult = merkletree_generator(originalpath, generatedPath);
    expect(merkleResult.merkleRoot).not.toBeNull();
})
