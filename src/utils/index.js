// import third part libraries
import _ from 'lodash';

const logic = {

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
    // - src/App.js
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

};

/* Export ==================================================================== */
export default logic;
