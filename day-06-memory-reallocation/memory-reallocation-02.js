function configsMatch(config1, config2){
    for (let i = 0; i < config1.length; i++){
        if (config1[i] !== config2[i])
            return false;
    }
    return true;
}

function configSeen(curConfig){
    for (i = 0; i < configs.length; i++){
        let storedConfig = configs[i];
        if (configsMatch(curConfig, storedConfig)){
            distance = configs.length - i;
            return true;
        }
            
    }
    return false;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\t').map(parseInt);
const inputLength = input.length;

let configs = [];
let curConfig = input.slice();
let distance = 0;

while (configSeen(curConfig) === false){

    configs.push(curConfig.slice());

    let max = 0;
    let maxIndex;

    curConfig.forEach((num,index) => {
        if (num > max){
            max = num;
            maxIndex = index;
        }
    });

    let banksThatGetExtra = max % inputLength;
    const blocksForAllBanks = Math.floor(max / inputLength);
    let totalSteps = inputLength;
    curConfig[maxIndex] = 0;

    if (blocksForAllBanks === 0)
        totalSteps = banksThatGetExtra;

    for (let i = 0; i < totalSteps; i++){
        
        let index = (maxIndex + i + 1) % inputLength;
        
        curConfig[index] += blocksForAllBanks;

        if (banksThatGetExtra){
            curConfig[index]++;
            banksThatGetExtra--;
        }

    }

}

console.log(distance);