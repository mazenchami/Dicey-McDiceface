import React from 'react';
import { withKnobs, number, object, } from "@storybook/addon-knobs";
import { Scoreboard, } from '../components/Scoreboard';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Scoreboard/scoreboard.css';
import '../utils/dice.css';
import '../App.css';
import '../index.css';

const styles = {
    background: 'repeating-linear-gradient(#071a1e 0%, #274249) fixed',
    minHeight: '100%',
    textAlign: 'center',
};

const App = ({ children, }) => <div style={styles}>{children}</div>;

export default {
  title:     'Scoreboard',
  component:  Scoreboard,
  decorators: [
      withKnobs,
      storyFn => <App>{storyFn()}</App>,
  ],
};

const countsObj = {
    one:   0,
    two:   0,
    three: 0,
    four:  0,
    five:  0,
    six:   0,
};
const countsObjWithRolls = {
    one:   4,
    two:   0,
    three: 3,
    four:  0,
    five:  1,
    six:   0,
};
export const Default = () => (
    <Scoreboard counts={object('Counts', countsObj)} numberOfDots={number('Number of Dots', 5)} />
);

export const CountsWithRolls = () => (
    <Scoreboard counts={object('Counts', countsObjWithRolls)} numberOfDots={number('Number of Dots', 5)} />
);

export const WinningNumberOf3 = () => (
    <Scoreboard counts={object('Counts', countsObj)} numberOfDots={number('Number of Dots', 3)}/>
);
