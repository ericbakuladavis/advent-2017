function joinPieces(pieces){
    if (pieces.length === 1)
        return pieces[0];
    const patternSize = Math.sqrt(pieces.length);
    pieces = pieces.map((piece) => {
        return piece.split('/');
    });
    const pieceSize = pieces[0].length; 
    let joinedPattern = [];
    for (let patternRow = 0; patternRow < patternSize; patternRow++){
        for (let pieceRow = 0; pieceRow < pieceSize; pieceRow++){
            let newRow = ''
            for (let pieceMarker = 0; pieceMarker < patternSize; pieceMarker++){
                let pieceIndex = pieceMarker + (patternSize * patternRow);
                newRow += pieces[pieceIndex][pieceRow];
            }
            joinedPattern.push(newRow);
        }
    }
    return joinedPattern.join('/');
}

function flipVertically(piece){
    piece = piece.split('/');
    piece.reverse()
    return piece.join('/');
}

function flipHorizontally(piece){
    piece = piece.split('/');
    piece = piece.map((row) => {
        let flippedRow = '';
        for (let i = piece.length - 1; i >= 0; i--){
            flippedRow += row[i];
        }
        return flippedRow;
    });
    return piece.join('/');
}

function rotate(piece){
    piece = piece.split('/');
    const pieceSize = piece.length;
    let rotatedPiece = '';
    for (let column = 0; column < pieceSize; column++){
        for (let row = pieceSize - 1; row >=0; row--){
            rotatedPiece += piece[row][column];
        }
    }
    return insertSlashes(rotatedPiece, pieceSize)
}

function findMatch(pattern, input){
    for (let i = 0; i < input.length; i++){
        const line = input[i];
        if (pattern === line.slice(0, pattern.length))
            return line.slice(pattern.length + 4);
    }
}

function checkRotations(piece, input){
    let match;
    for (let i = 0; i < 4; i++){
        match = findMatch(piece, input);
        if (match){
            return match;
        }
        piece = rotate(piece);
    }
}

function enhancePiece(piece, input){
    let match = checkRotations(piece, input)
    if (match)
        return match
    piece = flipHorizontally(piece, input);
    match = checkRotations(piece, input);
    if (match)
        return match;
    piece = flipVertically(piece, input);
    match = checkRotations(piece, input);
    if (match)
        return match;
    throw 'error: no match found';
}

function insertSlashes(piece, pieceSize){
    return  piece
            .match(new RegExp('.{' + pieceSize + '}', 'g'))
            .join('/');
}

function split(pattern){
    if (pattern.split('/').length <= 3)
        return [pattern];
    pattern = pattern.split('/');
    const pieceSize =  pattern.length % 2 === 0 ? 2 : 3;
    let pieces = ''
    for (let row = 0; row < pattern.length; row += pieceSize){
        for (let column = 0; column < pattern.length; column += pieceSize){
            for (let pieceRow = 0; pieceRow < pieceSize; pieceRow++){
                for (let pieceColumn = 0; pieceColumn < pieceSize; pieceColumn++){
                    pieces += pattern[row + pieceRow][column + pieceColumn]
                }
            }
        }
    }   
    return  pieces
            .match(new RegExp('.{' + Math.pow(pieceSize, 2) + '}', 'g'))
            .map((piece) => insertSlashes(piece, pieceSize));
}

function enhancePattern(pattern, input){
    const patternPieces = split(pattern);
    const enhancedPieces = patternPieces.map((piece) => {
        return enhancePiece(piece, input)
    });
    return joinPieces(enhancedPieces)
}

function countOnPixels(pattern, input, iterations){
    for (let i = 0; i < iterations; i++)
        pattern = enhancePattern(pattern, input);
    let onPixels = 0;
    for (let i = 0; i < pattern.length; i++){
        let pixel = pattern[i];
        if (pixel === '#')
            onPixels++;
    } 
    return onPixels
}

const fs = require('fs');
const input =   fs
                .readFileSync(`${__dirname}/input.txt`, 'utf8')
                .split('\n');

let startPattern ='.#./..#/###';

console.log ( 'On pixels after iterations:', countOnPixels(startPattern, input, 5) ); // 158
console.log('working...')
console.log ( 'On pixels after iterations:', countOnPixels(startPattern, input, 18) ); // 2301762

module.exports = {
    flipHorizontally,
    flipVertically,
    rotate,
    findMatch,
    enhancePiece,
    input
}