// import third part libraries
import _ from 'lodash';

const logic = {

    // handles our counters state logic
    // - src/App.js
    getCounters: (one = 0, two = 0, three = 0, four = 0, five = 0, six = 0) => {
        return {
            one,
            two,
            three,
            four,
            five,
            six,
        };
    },

    // handles our roll done logic
    // - src/App.js
    handleRollDoneLogic: (num, counts) => {
        let newCountsState = _.cloneDeep(counts);
        let newCount = (newCountsState[logic.returnNumbersToWords()[num]] + 1);
        newCountsState = _.update(newCountsState, logic.returnNumbersToWords()[num], () => newCount);
        return {
            newCount,
            newCountsState,
        };
    },

    // returns our custom fireworks props
    // - src/App.js
    returnFireworksProps: () => ({
        count: 3, // Count of the fireworks that are rendered concurrently
        interval: 500, // Interval in milliseconds for how often new fireworks get rendered
        colors: ['#cc3333', '#4CAF50', '#81C784'],
        calc: (props, i) => ({
            ...props,
            x: ((i + 1) * (window.innerWidth / 3) - (i + 1) * 100),
            y: (200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0))
        }) // Calc is a function that can be evaluated to generate `FireworksInput`
    }),

    // returns to winning number of rolls
    // - src/App.js & src/components/Scoreboard/Scoreboard.js
    returnWinningRollNumber: () => 5,

    // returns numbers to words for better mapping
    // - src/App.js
    returnNumbersToWords: () => ([
        '',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
    ]),

    // returns the number of faces our die has
    // - src/components/Scoreboard/Scoreboard.js
    returnNumberOfFaces: () => 6,

};

/* Export ==================================================================== */
export default logic;
