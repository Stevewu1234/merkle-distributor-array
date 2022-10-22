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

export const generateMerkleTree = (originalPath: string, generatedPath: string): MerkleDistributorInfo => {
  //   program
  //   .version('0.0.0')
  //   .requiredOption(
  //     '-i, --input <path>',
  //     'input JSON file location containing a map of account addresses to string balances'
  //   )

  // program.parse(process.argv)
  const json = fs.existsSync(originalPath) ? JSON.parse(fs.readFileSync(originalPath, { encoding: 'utf8' })) : new Error('original data not exist');
  if (typeof json !== 'object') throw new Error('Invalid JSON');

  fs.writeFileSync(generatedPath, JSON.stringify(parseBalanceMap(json), null, 4));

  return parseBalanceMap(json);
};
