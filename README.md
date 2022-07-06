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

3. ["address"]: string[], like the following case:

    ```javascript
    {
        "0x57E7c6B647C004CFB7A38E08fDDef09Af5Ea55eD": 
        [
        "1",
        "0xgew",
        "string",
        "2"
        ]
    }



### **the result of the merkle tree generation is the same of uniswap:**

```javascript
{
  "merkleRoot": "0xdefa96435aec82d201dbd2e5f050fb4e1fef5edac90ce1e03953f916a5e1132d",
  "tokenTotal": "0x64",
  "numDrops": 1,
  "claims": { "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f": { "index": 0, "amount": "0x64", "proof": [] } }
}
