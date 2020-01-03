const logic = {

    // returns our custom fireworks props
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

};

/* Export ==================================================================== */
export default logic;
