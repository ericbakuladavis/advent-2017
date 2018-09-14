const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

function getTotalScore(input){

    let stack = [];
    let garbage = false;
    let score = 0;

    for (let i = 0; i < input.length; i++){

        let character = input[i];
        
        switch (character){
            case '!': i++;
                      continue;
            case '<': garbage = true;
                      continue;
            case '>': garbage = false;
                      continue;    
        }

        if (garbage === false){

            switch (character){
                case '{': stack.push('{');
                          continue;
                case '}': score += stack.length;
                          stack.pop();
                          continue;
            }
        }
    }
    return score;
}

console.log(getTotalScore(input));