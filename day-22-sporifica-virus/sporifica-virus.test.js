const m = require('./sporifica-virus.js')

describe('virus', () => {
    test('setMap', () => {
        m.cluster.setMap(m.input);
        expect(m.cluster.column).toEqual(12);
        expect(m.cluster.row).toEqual(12);
    });
    test('currentNode', () => {
        m.cluster.setMap(m.input);
        expect(m.cluster.currentNode).toEqual('.');
    });
    test('turn', () => {
        m.cluster.setMap(m.input);
        m.cluster.turn();
        expect(m.cluster.directionIndex ).toEqual(3);
    });
    test('currentDirection', () => {
        m.cluster.setMap(m.input);
        expect(m.cluster.currentDirection).toEqual('up');
        m.cluster.turn();
        expect(m.cluster.currentDirection).toEqual('left');
    });
    test('cleanOrInfect', () => {
        m.cluster.setMap(m.input);
        expect(m.cluster.currentNode).toEqual('.');
        m.cluster.cleanOrInfect();
        expect(m.cluster.currentNode).toEqual('#');
        m.cluster.cleanOrInfect();
        expect(m.cluster.currentNode).toEqual('.');
    });
    test('move', () => {
        m.cluster.setMap(m.input);
        m.cluster.move();
        expect(m.cluster.row).toEqual(11);
    });
    test('get answer', () => {
        m.cluster.setMap(m.input);
        m.cluster.go(10000);
        expect(m.cluster.infectCount).toEqual(5433);
    });
  })