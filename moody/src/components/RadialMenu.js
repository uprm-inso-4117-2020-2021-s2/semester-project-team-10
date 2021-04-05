import React from 'react';
import PieMenu, { PieCenter, Slice } from 'react-pie-menu';
import { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.mood = ""
    this.state = {
      mood: null,
      choice: 0,
    };
  }


  SelectedHappy = ()  =>{
    this.mood = "happy";
    console.log("Happy")
    this.showRatings()
  }
  SelectedSad =  ()  =>{
    this.mood = "Sad"
    console.log("Sad")
    this.showRatings()
  }  
  SelectedScared =  ()  =>{
    this.mood = "Scared"
    console.log("Scared")
    this.showRatings()
  }  
  SelectedAngry = ()  =>{
    this.mood = "Angry"
    console.log("Angry")
    this.showRatings()
  }  
  SelectedMeh =  () =>{
    this.mood = "Meh"
    console.log("Meh")
    this.showRatings()
  }
  
  showRatings = () =>{
    this.setState({ choice: MOODRATING})
  }
  selectRating = mood => () => {
    console.log(mood)
    this.setState({ mood})
    
  }

  goBack = () => {
    const { choice } = this.state;
    if (choice === INITIAL) return;
    this.setState({ choice: INITIAL });
  }

  render() {
    const { angry,happy,sad,meh,scared, choice } = this.state;
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
              <Slice onSelect={this.SelectedAngry} attrs={{ filled: `${angry != null}` }}>
                <FontAwesomeIcon icon={angry || faAngry} size="2x" />
              </Slice>
              <Slice onSelect={this.SelectedHappy} attrs={{ filled: `${happy != null}` }}>
                <FontAwesomeIcon icon={happy || faGrinBeam} size="2x" />
              </Slice>
              <Slice onSelect={this.SelectedSad} attrs={{ filled: `${sad != null}` }}>
                <FontAwesomeIcon icon={sad || faSadCry} size="2x" />
              </Slice>
              <Slice onSelect={this.SelectedMeh} attrs={{ filled: `${meh != null}` }}>
                <FontAwesomeIcon icon={meh || faMeh} size="2x" />
              </Slice>
              <Slice onSelect={this.SelectedScared} attrs={{ filled: `${scared != null}` }}>
                <FontAwesomeIcon icon={scared || faGrimace} size="2x" />
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
        </PieMenu>
      </ThemeProvider>
    );
  }
}
