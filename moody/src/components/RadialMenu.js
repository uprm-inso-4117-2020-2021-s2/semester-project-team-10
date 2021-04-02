import React from 'react';
import PieMenu, { PieCenter, Slice } from 'react-pie-menu';
import { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVenusMars,
  faArrowLeft,
  faGenderless,
  faMars,
  faNeuter,
  faTransgender,
  faVenus,
  faGrinBeam,
  faAngry,
  faSadCry,
  faMeh,
  faGrimace,
} from '@fortawesome/free-solid-svg-icons';
import * as styles from './RadialMenu.style';

const theme = {
  pieMenu: {
    container: styles.container,
    center: styles.center,
  },
  slice: {
    container: styles.slice,
  },
};

const INITIAL = 0;
const MOODRATING = 1;
const GENDERS = 2;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: null,
      paymentOption: null,
      gender: null,
      location: null,
      choice: 0,
    };
  }

  showGenders = () => {
    this.setState({ choice: GENDERS });
  }
  selectGender = gender => () => {
    this.setState({ gender });
  }
  selectRating = mood => ()  =>{
    this.setState({mood});
  }
  showRatings = () =>{
    this.setState({ choice: MOODRATING})
  }

  goBack = () => {
    const { choice } = this.state;
    if (choice === INITIAL) return;
    this.setState({ choice: INITIAL });
  }

  render() {
    const { mood, gender, location, choice } = this.state;
    const Center = props => (
      <PieCenter {...props} onClick={this.goBack}>
        {choice !== 0 && <FontAwesomeIcon icon={faArrowLeft} size="2x" />}
      </PieCenter>
    );
    return (
      <ThemeProvider theme={theme}>
        <PieMenu centerRadius="30px" Center={Center}>
          {choice === 0 && (
            <>
              <Slice onSelect={this.showRatings} attrs={{ filled: `${mood != null}` }}>
                <FontAwesomeIcon icon={mood || faAngry} size="2x" />
              </Slice>
              <Slice onSelect={this.showRatings} attrs={{ filled: `${mood != null}` }}>
                <FontAwesomeIcon icon={mood || faGrinBeam} size="2x" />
              </Slice>
              <Slice onSelect={this.showRatings} attrs={{ filled: `${mood != null}` }}>
                <FontAwesomeIcon icon={mood || faSadCry} size="2x" />
              </Slice>
              <Slice onSelect={this.showRatings} attrs={{ filled: `${mood != null}` }}>
                <FontAwesomeIcon icon={mood || faMeh} size="2x" />
              </Slice>
              <Slice onSelect={this.showGenders} attrs={{ filled: `${gender != null}` }}>
                <FontAwesomeIcon icon={gender || faVenusMars} size="2x" />
              </Slice>
              <Slice onSelect={this.showRatings} attrs={{ filled: "`${mood != null}`" }}>
                <FontAwesomeIcon icon={location || faGrimace} size="2x" />
              </Slice>
            </>
          )}

          { choice === MOODRATING && (
            <>
              <Slice
                onSelect={this.selectRating(1)}
                contentHeight="66px"
                // attrs={{ active: `${MOODRATING === 1}` }}
              >
                <h1>1</h1>
              </Slice>
              <Slice
                onSelect={this.selectRating(2)}
                contentHeight="66px"
                // attrs={{ active: `${MOODRATING === 2}` }}
              >
                <h1>2</h1>
              </Slice>              <Slice
                onSelect={this.selectRating(3)}
                contentHeight="66px"
                // attrs={{ active: `${MOODRATING === 3}` }}
              >
                <h1>3</h1>
              </Slice>              <Slice
                onSelect={this.selectRating(4)}
                contentHeight="66px"
                // attrs={{ active: `${MOODRATING === 4}` }}
              >
                <h1>4</h1>
              </Slice>              <Slice
                onSelect={this.selectRating(5)}
                contentHeight="66px"
                // attrs={{ active: `${MOODRATING === 5}` }}
              >
                <h1>5</h1>
              </Slice>              
              <Slice
                onSelect={this.selectRating(6)}
                contentHeight="66px"
                // attrs={{ active: `${MOODRATING === 6}` }}
              >
                <h1>6</h1>
              </Slice>
              <Slice
                onSelect={this.selectRating(7)}
                contentHeight="66px"
                // attrs={{ active: `${MOODRATING === 6}` }}
              >
                <h1>7</h1>
              </Slice>              <Slice
                onSelect={this.selectRating(8)}
                contentHeight="66px"
                // attrs={{ active: `${MOODRATING === 6}` }}
              >
                <h1>8</h1>
              </Slice>              <Slice
                onSelect={this.selectRating(9)}
                contentHeight="66px"
                // attrs={{ active: `${MOODRATING === 6}` }}
              >
                <h1>9</h1>
              </Slice>              <Slice
                onSelect={this.selectRating(10)}
                contentHeight="66px"
                // attrs={{ active: `${MOODRATING === 6}` }}
              >
                <h1>10</h1>
              </Slice>
            </>
          )}

          {choice === GENDERS && (
            <>
              faGenderless
              <Slice
                onSelect={this.selectGender(faGenderless)}
                contentHeight="66px"
                attrs={{ active: `${gender === faGenderless}` }}
              >
                <div>
                  <FontAwesomeIcon icon={faGenderless} size="2x" />
                  <p>Genderless</p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectGender(faVenus)}
                contentHeight="66px"
                attrs={{ active: `${gender === faVenus}` }}
              >
                <div>
                  <FontAwesomeIcon icon={faVenus} size="2x" />
                  <p>Female</p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectGender(faNeuter)}
                contentHeight="66px"
                attrs={{ active: `${gender === faNeuter}` }}
              >
                <div>
                  <FontAwesomeIcon icon={faNeuter} size="2x" />
                  <p>Neuter</p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectGender(faTransgender)}
                contentHeight="66px"
                attrs={{ active: `${gender === faTransgender}` }}
              >
                <div>
                  <FontAwesomeIcon icon={faTransgender} size="2x" />
                  <p>Transgender</p>
                </div>
              </Slice>
              <Slice
                onSelect={this.selectGender(faMars)}
                contentHeight="66px"
                attrs={{ active: `${gender === faMars}` }}
              >
                <div>
                  <FontAwesomeIcon icon={faMars} size="2x" />
                  <p>Male</p>
                </div>
              </Slice>
            </>
          )}
        </PieMenu>
      </ThemeProvider>
    );
  }
}
