function getSpaceIndices(line){
    let spaceIndices = [];
    for (let i = 0; spaceIndices.length < 5; i++){
        let character = line[i];
        if (character === ' ')
            spaceIndices.push(i);
    }
    return spaceIndices;
}

function parseLine(line){
    let spaceIndices = getSpaceIndices(line);
    let registerName = line.slice(0, spaceIndices[0]);
    let operation = line.slice(spaceIndices[0] + 1, spaceIndices[1]);
    let amount = parseInt(line.slice(spaceIndices[1] + 1, spaceIndices[2]));
    let expression = line.slice(spaceIndices[3] + 1);
    let expressionRegisterName = line.slice(spaceIndices[3] + 1, spaceIndices[4]);
    return {registerName, operation, amount, expression, expressionRegisterName};
}

function followInstructionsAndTrackMaxValue(input){

    let registers = {};
    let maxValue = 0;

    input.forEach((line) => {        
        let instructions = parseLine(line);
        let {registerName, operation, amount, expression, expressionRegisterName} = instructions;

        // Initialize registers if they don't already exist
        if (!registers[registerName])
            registers[registerName] = 0;
        if (!registers[expressionRegisterName])
            registers[expressionRegisterName] = 0;
        
        // Evaluate the expression
        expression = 'registers.' + expression; 
        if (eval(expression)){

            // Modify the register
            if (operation === 'inc')
                registers[registerName] += amount;
            else
                registers[registerName] -= amount;

            // Check and set the maxValue
            if (registers[registerName] > maxValue)
                maxValue = registers[registerName]; 
        }
    });

    return maxValue;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

console.log(followInstructionsAndTrackMaxValue(input));