// import utils
import logic from './';

test('Confirms our winning roll number is 5', () => {
    expect(logic.returnWinningRollNumber()).toEqual(5);
});

test('Confirms our number to works function works as expected', () => {
    let expectedResult = [
        '',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
    ];
    expect(logic.returnNumbersToWords()).toEqual(expectedResult);
});

describe('Testing Handle Roll Done Logic', () => {
    test('Adding 1 to 1', () => {
        let expectObj = logic.handleRollDoneLogic(1, logic.getCounters());
        let expectedResult = {
            newCount: 1,
            newCountsState: logic.getCounters(1),
        };
        expect(expectObj).toEqual(expectedResult);
    });
    test('Adding 5 to 4', () => {
        let expectObj = logic.handleRollDoneLogic(4, logic.getCounters(0, 1, 3, 4));
        let expectedResult = {
            newCount: 5,
            newCountsState: logic.getCounters(0, 1, 3, 5),
        };
        expect(expectObj).toEqual(expectedResult);
    });
    test('Adding 3 to 6', () => {
        let expectObj = logic.handleRollDoneLogic(6, logic.getCounters(0, 1, 3, 0, 4, 2));
        let expectedResult = {
            newCount: 3,
            newCountsState: logic.getCounters(0, 1, 3, 0, 4, 3),
        };
        expect(expectObj).toEqual(expectedResult);
    });
    test('Adding 2 to 3', () => {
        let expectObj = logic.handleRollDoneLogic(3, logic.getCounters(0, 4, 1));
        let expectedResult = {
            newCount: 2,
            newCountsState: logic.getCounters(0, 4, 2),
        };
        expect(expectObj).toEqual(expectedResult);
    });
});
