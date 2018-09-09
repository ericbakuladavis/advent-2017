function convertInputToObjectAndAssesBottomCandidates(input){
    let data = {};
    input.forEach((line) => {
        let openParensIndex;
        let listIndex;
        for (let i = 0; !listIndex && i < line.length ; i++){
            let char = line[i];
            switch (char) {
                case '(':   openParensIndex = i;
                            break;
                case '-':   listIndex = i + 3;
                            break;
            }
        }
        let program = line.slice(0, openParensIndex - 1);
        if(!data.hasOwnProperty(program))
            data[program] = {};
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

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

let data = convertInputToObjectAndAssesBottomCandidates(input);
let bottom = getBottom(data);

console.log(bottom);