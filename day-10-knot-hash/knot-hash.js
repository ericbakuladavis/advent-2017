const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

const knotHash = require('../functions/knot-hash');

console.log('weak hash:', knotHash(input, 'weak', 1)); // 40132
console.log('strong hash:', knotHash(input, 'strong', 64)); // 35b028fe2c958793f7d5a61d07a008c8