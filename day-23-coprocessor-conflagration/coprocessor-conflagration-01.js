function getValue(registers, string){
    return !isNaN(string) ? parseInt(string) : registers[string];
}

function set(registers, register, y){
    const valueOfY = getValue(registers, y);
    registers[register] = valueOfY;
}

function subtract(registers, register, y){
    const valueOfY = getValue(registers, y);
    registers[register] -= valueOfY;
}

function multiply(registers, register, y){
    const valueOfY = getValue(registers, y);
    registers[register] *= valueOfY;
}

function jump(registers, x, y){
    const valueOfX = getValue(registers, x);
    const valueOfY = getValue(registers, y);
    if (valueOfX !== 0)
        return valueOfY;   
}

function parseInstruction(instruction){
    const operationNickname = instruction[0];
    const x = instruction[1];
    const y = instruction[2];
    return {operationNickname, x, y}
}

function countMulInvocations(input){
    registers = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0
    };
    let mulCount = 0;
    let i = 0; 
    while (i < input.length && i >= 0){
        const {operationNickname, x, y} = parseInstruction(input[i]);
        switch(operationNickname){
            case 'set': set(registers, x, y);
                        break;
            case 'sub': subtract(registers, x, y);
                        break;
            case 'mul': multiply(registers, x, y);
                        mulCount++
                        break;
            case 'jnz': const jumpResult = jump(registers, x, y);
                        if (jumpResult){
                            i += jumpResult;
                            continue;
                        }
                        break;
        }
        i++;
    }
    return mulCount;
}

const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n')
                .map((instruction) => instruction.split(' '));

console.log(`Multiply was invoked ${countMulInvocations(input)} times.` );