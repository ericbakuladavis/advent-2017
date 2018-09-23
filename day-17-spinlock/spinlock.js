function getValueAfterIndex(input, cycles, index){
    let bufferLength = 1;
    let currentPosition = 0;
    let valueAfterIndex = undefined;
    for (let value = 1; value <= cycles; value++){
        currentPosition = (currentPosition + input) % bufferLength;
        bufferLength++;
        currentPosition++;
        if (currentPosition === index + 1)
            valueAfterIndex = value;
    }
    return valueAfterIndex;
}

function getValueAfterFinalInsertion(input, cycles){
    const buffer = [0];
    let currentPosition = 0;
    for (let value = 1; value <= cycles; value++){
        currentPosition = (currentPosition + input) % buffer.length;
        buffer.splice(currentPosition + 1, 0, value);
        currentPosition++;
    }
    return buffer[currentPosition + 1];
}

const input = 303;
console.log( 'The value to the right of the final insertion is:', getValueAfterFinalInsertion(input, 2017) );
console.log( 'The value to the right of the index is:', getValueAfterIndex(input, 50000000, 0) );