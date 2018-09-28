const m = require('./fractal-art')

describe('fractal art', () => {
    test('horizontal flip', () => {
        expect(m.flipHorizontally('../#.')).toEqual('../.#');
        expect(m.flipHorizontally('.../#../##.')).toEqual('.../..#/.##');
    });
    test('vertical flip', () => {
        expect(m.flipVertically('../#.')).toEqual('#./..');
        expect(m.flipVertically('.../#../##.')).toEqual('##./#../...');
    });
    test('rotate', () => {
        expect(m.rotate('../#.')).toEqual('#./..');
        expect(m.rotate('.../#../##.')).toEqual('##./#../...');
    });
    test('find match', () => {
        expect(m.findMatch('../..', m.input)).toEqual('.../.##/##.');
        expect(m.findMatch('#.#/.../...', m.input)).toEqual('##.#/..../####/...#');
    });
    test('enhance piece', () => {
        expect(m.enhancePiece('#./..', m.input)).toEqual('.##/.##/#..');
        expect(m.enhancePiece('../#.', m.input)).toEqual('.##/.##/#..');
        expect(m.enhancePiece('.#/..', m.input)).toEqual('.##/.##/#..');
        expect(m.enhancePiece('../.#', m.input)).toEqual('.##/.##/#..');
        expect(m.enhancePiece('##./.../...', m.input)).toEqual('..../..#./##../##.#');
        expect(m.enhancePiece('.../.../##.', m.input)).toEqual('..../..#./##../##.#');
        expect(m.enhancePiece('.##/.../...', m.input)).toEqual('..../..#./##../##.#');
        expect(m.enhancePiece('..#/..#/...', m.input)).toEqual('..../..#./##../##.#');
        expect(m.enhancePiece('.../.../.##', m.input)).toEqual('..../..#./##../##.#');
        expect(m.enhancePiece('.../#../#..', m.input)).toEqual('..../..#./##../##.#');
        expect(m.enhancePiece('###/..#/.#.', m.input)).toEqual('###./..##/.#../.##.');
        expect(m.enhancePiece('##./#.#/#..', m.input)).toEqual('###./..##/.#../.##.');
        expect(m.enhancePiece('.#./..#/###', m.input)).toEqual('###./..##/.#../.##.');
    });
  })