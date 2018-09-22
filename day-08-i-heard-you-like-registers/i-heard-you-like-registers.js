function getSpaceIndices(line){
    const spaceIndices = [];
    for (let i = 0; spaceIndices.length < 5; i++){
        const character = line[i];
        if (character === ' ')
            spaceIndices.push(i);
    }
    return spaceIndices;
}

function parseLine(line){
    const   spaceIndices = getSpaceIndices(line),
            registerName = line.slice(0, spaceIndices[0]),
            operation = line.slice(spaceIndices[0] + 1, spaceIndices[1]),
            amount = parseInt(line.slice(spaceIndices[1] + 1, spaceIndices[2])),
            expression = 'registers.' + line.slice(spaceIndices[3] + 1),
            expressionRegisterName = line.slice(spaceIndices[3] + 1, spaceIndices[4]);
    return {registerName, operation, amount, expression, expressionRegisterName};
}

function followInstructions(input){

    const registers = {};
    let maxValue = 0;

    input.forEach((line) => {        
        const instructions = parseLine(line);
        const {registerName, operation, amount, expression, expressionRegisterName} = instructions;

        // Initialize registers if they don't already exist
        if (!registers.hasOwnProperty(registerName))
            registers[registerName] = 0;
        if (!registers.hasOwnProperty(expressionRegisterName))
            registers[expressionRegisterName] = 0;
        
        // Evaluate the expression 
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
    
    const values = Object.values(registers);
    console.log('Max value at end of process: ', Math.max(...values)); // 7296
    console.log('Max value during process: ', maxValue); // 8186
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

followInstructions(input); 