import { Command, program } from 'commander';
import fs from 'fs';
import { parseBalanceMap } from '../merkle/parse-balance-map';

export interface MerkleDistributorInfo {
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

export const generateMerkleTree = (originalFilePath: string, generatedPath: string): MerkleDistributorInfo => {
  const json = fs.existsSync(originalFilePath) ? JSON.parse(fs.readFileSync(originalFilePath, { encoding: 'utf8' })) : new Error('original data not exist');
  if (typeof json !== 'object') throw new Error('Invalid JSON');

  const root = parseBalanceMap(json).merkleRoot;

  fs.writeFileSync(`${generatedPath}/${root}.json`, JSON.stringify(parseBalanceMap(json), null, 4));

  return parseBalanceMap(json);
};
