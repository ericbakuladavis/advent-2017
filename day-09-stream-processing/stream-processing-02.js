function countGarbage(input){

    let garbage = false;
    let count = 0;

    for (let i = 0; i < input.length; i++){
        const character = input[i];
        
        if (character === '!'){
            i++;
            continue;
        }
        
        if (garbage === false && character === '<'){
            garbage = true;
            continue;
        }

        if (garbage === true){
            if (character === '>'){
                garbage = false;
                continue;
            } else {
                count++;
                continue;
            }
        }
    }
    return count;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

console.log(countGarbage(input)); // 6425