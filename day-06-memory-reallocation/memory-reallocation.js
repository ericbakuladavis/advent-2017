function getMax(config){
    let maxNum = 0;
    let maxIndex;
    config.forEach((num, index) => {
        if (num > maxNum){
            maxNum = num;
            maxIndex = index;
        }
    });
    return {'num': maxNum, 'index': maxIndex};
}

function redistributeBlocks(config){
    const configLength = config.length;
    const max = getMax(config);
    const maxNum = max.num;
    const maxIndex = max.index;

    let banksThatGetExtra = maxNum % configLength;
    const blocksForAllBanks = Math.floor(maxNum / configLength);
    let totalSteps = configLength;
    config[maxIndex] = 0;

    if (blocksForAllBanks === 0)
        totalSteps = banksThatGetExtra;

    for (let i = 0; i < totalSteps; i++){
        const index = (maxIndex + i + 1) % configLength;
        config[index] += blocksForAllBanks;
        if (banksThatGetExtra){
            config[index]++;
            banksThatGetExtra--;
        }
    }
    return config;
}

function countCyclesUntilDuplicateConfig(input){
    const seen = {};
    let config = input.slice();
    let configString = JSON.stringify(config); 
    let position = 0;

    while(!seen.hasOwnProperty(configString)){
        seen[configString] = position;
        config = redistributeBlocks(config);
        configString = JSON.stringify(config);
        position++;    
    }
    console.log('Cycles run before duplicate config appears: ', position) // 5042
    console.log('Cycles between 1st and 2nd instance of duplicate: ', position - seen[configString]);  // 1086
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\t').map((str) => parseInt(str));

countCyclesUntilDuplicateConfig(input);