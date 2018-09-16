function getTotalScore(input){

    let openBraces = 0;
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
                case '{': openBraces++;
                          continue;
                case '}': score += openBraces;
                          openBraces--;
                          continue;
            }
        }
    }
    return score;
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');

console.log(getTotalScore(input)); // 12803