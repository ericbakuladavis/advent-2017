function getMax(config){
    let maxNum = 0;
    let maxIndex;
    config.forEach((num, index) => {
        if (num > maxNum){
            maxNum = num;
            maxIndex = index;
        }
    });
    return {maxNum, maxIndex};
}

function redistributeBlocks(config){
    let configLength = config.length;
    let {maxNum, maxIndex} = getMax(config);

    let banksThatGetExtra = maxNum % configLength;
    const blocksForAllBanks = Math.floor(maxNum / configLength);
    let totalSteps = configLength;
    config[maxIndex] = 0;

    if (blocksForAllBanks === 0)
        totalSteps = banksThatGetExtra;

    for (let i = 0; i < totalSteps; i++){
        let index = (maxIndex + i + 1) % configLength;
        config[index] += blocksForAllBanks;
        if (banksThatGetExtra){
            config[index]++;
            banksThatGetExtra--;
        }
    }
    return config;
}

function countCyclesUntilDuplicateConfig(input){
    let seen = new Set();
    let config = input.slice();
    let configString = JSON.stringify(config); 

    while(!seen.has(configString)){
        seen.add(configString);
        config = redistributeBlocks(config);
        configString = JSON.stringify(config);    
    }
    return seen.size;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\t').map((str) => parseInt(str));

console.log(countCyclesUntilDuplicateConfig(input)); // 5042