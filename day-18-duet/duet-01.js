function getValue(registers, string){
    return !isNaN(string) ? parseInt(string) : registers[string];
}

function sound(registers, x){
    let frequency = getValue(registers, x);
    registers.lastFrequencyPlayed = frequency;
}

function set(registers, register, y){
    const valueOfY = getValue(registers, y);
    registers[register] = valueOfY;
}

function add(registers, register, y){
    const valueOfY = getValue(registers, y)
    registers[register] += valueOfY;
}

function multiply(registers, register, y){
    const valueOfY = getValue(registers, y);
    registers[register] *= valueOfY;
}

function modulo(registers, register, y){
    const valueOfY = getValue(registers, y)
    registers[register] %= valueOfY;
}

function recover(registers, register){
    if (registers[register] !== 0){
        return registers.lastFrequencyPlayed;
    }
}

function jump(registers, x, y){
    const valueOfX = getValue(registers, x);
    const valueOfY = getValue(registers, y);
    if (valueOfX > 0)
        return valueOfY - 1;   
}

function parseInstruction(instruction){
    const operationNickname = instruction[0];
    const x = instruction[1];
    const y = instruction[2];
    return {operationNickname, x, y}
}

function getFirstRecoveredValue(input){
    registers = {};
    for (let i = 0; i < input.length && i >= 0; i++){
        const {operationNickname, x, y} = parseInstruction(input[i]);
        switch(operationNickname){
            case 'snd': sound(registers, x);
                        break;
            case 'set': set(registers, x, y);
                        break;
            case 'add': add(registers, x, y);
                        break;
            case 'mul': multiply(registers, x, y);
                        break;
            case 'mod': modulo(registers, x, y);
                        break;
            case 'rcv': const recoverResult = recover(registers, x);
                        if (recoverResult)   
                            return recoverResult; 
                        break;
            case 'jgz': const jumpResult = jump(registers, x, y);
                        if (jumpResult)
                            i += jumpResult;
                        break;
        }
    }
}

const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n')
                .map((instruction) => instruction.split(' '));

console.log ( 'The first recovered frequency was', getFirstRecoveredValue(input) ); // 8600