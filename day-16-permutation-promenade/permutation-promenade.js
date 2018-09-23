function spin(programs, rotations){
    rotations = parseInt(rotations);
    const end = programs.splice(programs.length - rotations, rotations);
    programs.unshift(...end);
}

function exchange(programs, instructions){
    const position1 = parseInt(instructions.match(/^\d+/)[0]);
    const position2 = parseInt(instructions.match(/\d+$/)[0]);
    const program1 = programs[position1];
    const program2 = programs[position2];
    programs[position1] = program2;
    programs[position2] = program1;
}

function partner(programs, instructions){
    const program1 = instructions[0];
    const program2 = instructions[2];
    const position1 = programs.indexOf(program1);
    const position2 = programs.indexOf(program2);
    programs[position1] = program2;
    programs[position2] = program1;
}

function getFinalOrder(programs, input, cycles){
    const initialState = programs;
    programs = programs.split('');
    for (let i = 1; i <= cycles; i++){
        input.forEach((danceMove) => {
            let moveFunction;
            switch (danceMove[0]){
                case 's':   moveFunction = spin;
                            break;
                case 'x':   moveFunction = exchange;
                            break;
                case 'p':   moveFunction = partner;
                            break;
            }
            moveFunction(programs, danceMove.slice(1));
        });
        if (programs.join('') === initialState){
            const cyclesToProduceInitialState = i;
            const minimumRequiredCycles = cycles % cyclesToProduceInitialState;
            cycles = i + minimumRequiredCycles;
        }
    }
    return programs.join('');
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split(',');
console.log('The final order is: ', getFinalOrder('abcdefghijklmnop', input, 1000000000));
