import { Command, program } from 'commander'
import fs from 'fs'
import { parseBalanceMap } from '../merkle/parse-balance-map'



export const generateMerkleTree = (originalPath: string, generatedPath: string) => {

  //   program
  //   .version('0.0.0')
  //   .requiredOption(
  //     '-i, --input <path>',
  //     'input JSON file location containing a map of account addresses to string balances'
  //   )

  // program.parse(process.argv)
  const json = JSON.parse(fs.readFileSync(originalPath, { encoding: 'utf8' }))
  if (typeof json !== 'object') throw new Error('Invalid JSON')

  fs.writeFileSync(generatedPath, JSON.stringify(parseBalanceMap(json), null, 4));

}
