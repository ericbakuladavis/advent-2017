function getTripSeverity(delay){
    let tripSeverity = 0;
    for (layer in firewall){
        const depth = parseInt(layer);
        const scannerPositionWhenPacketArrives = getScannerPosition(layer, delay + depth);
        if (scannerPositionWhenPacketArrives === 0){
            const range = firewall[layer];
            tripSeverity += depth * range;
        }
    }
    return tripSeverity;    
}

function getScannerPosition(layer, time){
    if (firewall.hasOwnProperty(layer)){
        const layerRange = firewall[layer];
        const maxScannerPosition = layerRange - 1;
        const cycleDuration = maxScannerPosition * 2;
        const effectiveTime = time % cycleDuration;
        if (effectiveTime <= maxScannerPosition)
            return effectiveTime;
        return (maxScannerPosition * 2) - effectiveTime;
    }
    return undefined;
}

function packetIsSafe(delay){
    for (layer in firewall){
        const depth = parseInt(layer);
        const scannerPositionWhenPacketArrives = getScannerPosition(layer, delay + depth);
        if (scannerPositionWhenPacketArrives === 0)
            return false;
        
    }
    return true;
}

function findSafeDelay(maxDelay){
    for (let delay = 0; delay < maxDelay; delay++){
        if (packetIsSafe(delay))
            return delay;
    }
}

const fs = require('fs');
const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8').split('\n');

const firewall = {

    deepestLayer: 0,

    populate(input){
        input.forEach((line) => {
            const layer = parseInt(line.match(/^\d+/)[0]);
            const range = parseInt(line.match(/\d+$/)[0]);
            this[layer] = range;
            if (layer > this.deepestLayer)
                this.deepestLayer = layer;
        });
    }
}

firewall.populate(input);
console.log(`The trip severity with no delay is ${getTripSeverity(0)}`); // 1640
console.log('The shortest safe delay is (wait for it)...');
console.log(findSafeDelay(10000000)); // 3960702