function convertInputToObjectAndAssesBottomCandidates(input){
    let data = {};
    input.forEach((line) => {
        let openParensIndex;
        let closeParensIndex;
        let listIndex;
        for (let i = 0; !listIndex && i < line.length ; i++){
            let char = line[i];
            switch (char) {
                case '(':   openParensIndex = i;
                            break;
                case ')':   closeParensIndex = i;
                            break;
                case '-':   listIndex = i + 3;
                            break;
            }
        }
        let program = line.slice(0, openParensIndex - 1);
        if(!data.hasOwnProperty(program))
            data[program] = {};
        let weight = parseInt(line.slice(openParensIndex + 1, closeParensIndex));
        data[program].weight = weight;
        if (listIndex){
            let supportedPrograms = line.slice(listIndex).split(', ');
            data[program].supportedPrograms = supportedPrograms;
            assessBottomCandidates(program, data);
        }
    });
    return data;
}

function assessBottomCandidates(program, data){
    if (data[program].isBottom !== 'no')
        data[program].isBottom = 'maybe';
    for (supportedProgram of data[program].supportedPrograms){
        if(!data.hasOwnProperty(supportedProgram))
            data[supportedProgram] = {};
        data[supportedProgram].isBottom = 'no';
    }
}

function getBottom(data){
    for (program in data){
        if (data[program].isBottom === 'maybe')
            return program;
    }
}

function getTotalWeight(program){
    let weightOfSupportedPrograms = 0;
    let programWeight = data[program].weight; 
    if (data[program].hasOwnProperty('supportedPrograms')){
        for (supportedProgram of data[program].supportedPrograms){
            weightOfSupportedPrograms += getTotalWeight(supportedProgram);
        }
    }
    return weightOfSupportedPrograms + programWeight;
 }

function getHighestUnbalanced(base, previousCommonTotalWeight){
    for (let i = 0; i < 3; i++){
        program = data[base].supportedPrograms[i];
        data[program].totalWeight = getTotalWeight(program);
    }
    //if the first weight matches the second weight, that's our balanced weight
    //otherwise, one of the first two weights is the unbalanced program. so, the third weight is our balanced weight.
    let balancedTotalWeight;
    if (data[data[base].supportedPrograms[0]].totalWeight === data[data[base].supportedPrograms[1]].totalWeight)
        balancedTotalWeight = data[data[base].supportedPrograms[0]].totalWeight;
    else
        balancedTotalWeight = data[data[base].supportedPrograms[2]].totalWeight;
    // loop over all supported programs, searching for an unbalanced program
    let unbalancedProgram;
    for (let i = 0; i < data[base].supportedPrograms.length; i++){
        let program = data[base].supportedPrograms[i];
        if (i > 2)
            data[program].totalWeight = getTotalWeight(program);
        // if we find one, record it and stop searching
        if (data[program].totalWeight !== balancedTotalWeight){
            unbalancedProgram = program;
            break;
        }
    }
    // if there's no unbalanced program above then base must be the highest unbalanced program. so, return it 
    if (unbalancedProgram === undefined){
        data[base].balancedTotalWeight = previousCommonTotalWeight;
        return base;
    // otherwise return the highest unbalanced program above the base
    } else {
        return getHighestUnbalanced(unbalancedProgram, balancedTotalWeight);
    }
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

let data = convertInputToObjectAndAssesBottomCandidates(input);
let bottom = getBottom(data);
let highestUnbalanced = getHighestUnbalanced(bottom);
let diff = data[highestUnbalanced].balancedTotalWeight - data[highestUnbalanced].totalWeight;
let solution = data[highestUnbalanced].weight + diff;

console.log(solution);