# @stevewu/merkle-distributor-array

### **the new merkle tree distributor generator supports three format of original data**

1. ["address"]: string, like the following case:

    ```javascript
    {
        "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f": "100"
    }

2. ["address"]: number, like the following case:

    ```javascript
    {
        "0xC7AA922f0823DeE2eD721E61ebCCF2F9596017Fb": 100
    }

3. ["address"]: string["uint"], like the following case:

    ```javascript
    {
        "0x57E7c6B647C004CFB7A38E08fDDef09Af5Ea55eD": 
            [
                "1",
                "3463",
                "34527",
                "34252"
            ],
        "0x7C262baf13794f54e3514539c411f92716996C38": 
            [
                "1",
                "2456",
                "4"
            ],
    }

4. ["address"]: string["string"], like the following case:

    ```javascript
    {
        "0xF3c6F5F265F503f53EAD8aae90FC257A5aa49AC1": 
            [
                "hello world",
                "I'm find, thanks"
            ],
        "0xB9CcDD7Bedb7157798e10Ff06C7F10e0F37C6BdD": 
            [
                "how old are u",
                "I'm 9999 years old",
                "666"
            ]
    }

### **How to user?**

After import from merkle-distributor-array, only one function to use:

```javascript
import { merkletree_generator } from 'merkle-distributor-array';

const generator = merkletree_generator(originalpath: string, generatedpath: string);
```

*originalpath* is your target file path, *generatedPath* is which the generated merkle tree file to save on. The result will return a MerkleDistributorInfo obejct.



### **the result of the merkle tree generation is the same of uniswap:**

```javascript
{
  "merkleRoot": "0xdefa96435aec82d201dbd2e5f050fb4e1fef5edac90ce1e03953f916a5e1132d",
  "tokenTotal": "0x64",
  "numDrops": 1,
  "claims": { "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f": { "index": 0, "amount": "0x64", "proof": [] } }
}
