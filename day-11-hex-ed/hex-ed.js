
function getDirectionHome(x, y){
    if (x > 0){
        if (y > 0)
            return 'sw';
        return 'nw';
    }
    if (x < 0){
        if (y > 0)
            return 'se';
        return 'ne';
    }
    if (y > 0)
        return 's';
    if (y < 0)
        return 'n';
    return null;
}

function calculateStepsToHome(x,y){
    let stepsToHomeTaken = 0;
    while (x !== 0 || y !== 0){
        let directionHome = getDirectionHome(x,y);
        if (directionHome === null){
            return stepsToHomeTaken;
        }
        let newCoordinate = takeStep(x, y, directionHome)
        x = newCoordinate.x;
        y = newCoordinate.y;
        stepsToHomeTaken++;
    }
    return stepsToHomeTaken;
}

function takeStep(x, y, direction){
    switch(direction){
        case 'n':   y += 1;
                    break;
        case 'ne':  x += 1;
                    y += 0.5;
                    break;
        case 'se':  x += 1;
                    y += -0.5;
                    break;
        case 's':   y += -1;
                    break;
        case 'sw':  x += -1;
                    y += -0.5;
                    break;
        case 'nw':  x += -1;
                    y += 0.5;
                    break;        
    }
    return {x, y};
}

function retraceSteps(input){
    let x = 0;
    let y = 0;
    let stepsFromHome = 0
    let maxStepsFromHome = 0;
    input.forEach((direction) => {
        let newCoordinate = takeStep(x, y, direction);
        x = newCoordinate.x;
        y = newCoordinate.y;
        stepsFromHome = calculateStepsToHome(x,y);
        if (stepsFromHome > maxStepsFromHome)
            maxStepsFromHome = stepsFromHome;
    });
    console.log('Final steps from home: ', stepsFromHome); // 794
    console.log('Max steps from home: ', maxStepsFromHome); // 1524
}   

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split(',');

retraceSteps(input);