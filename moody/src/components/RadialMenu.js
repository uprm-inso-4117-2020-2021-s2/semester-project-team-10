import React from 'react';
import PieMenu, { PieCenter, Slice } from 'react-pie-menu';
import { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faGrinSquintTears,
  faGrinTongueSquint,
  faGrinStars,
  faDizzy,
  faFlushed,
  faFrown,
  faSurprise,
  faGrinBeam,
  faBullseye,
  faAngry,
  faSadCry,
  faMeh,
  faGrimace,
  faMehRollingEyes,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import * as styles from './RadialMenu.style';

const theme = {
  pieMenu: {
    // container: styles.container,
    center: styles.center,
  },
  slice: {
    container: styles.slice,
  },
};

const INITIAL = 0;
const MOODRATING = 1;
const CLOSED = 2;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.mood = ""
    this.icon = faBullseye
    this.state = {
      moodState: "",
      choice: 0,
    };

  }

  SelectedMood = (mood,icon) => {
    
    this.icon = icon;
    this.mood = mood;
    this.setState({moodState: mood});
    this.props.pageSend(this.mood)
    console.log(mood);

  }
  
  showRatings = () =>{
    this.setState({ choice: MOODRATING})
  }
  selectRating = rating => () => {
    console.log(rating)
    this.setState({ rating})
    
  }

  goBack = () => {
    const { choice } = this.state;
    if (choice === INITIAL) this.setState({ choice: CLOSED}) ;
    if (choice === CLOSED) this.setState({choice : INITIAL}) ; return;

  }

  render() {
    const { angry,happy,sad,meh,scared, moodState,choice } = this.state;
    const Center = props => (
      <PieCenter {...props} onClick={this.goBack}>
        {<FontAwesomeIcon icon={this.icon} size="2x" />}

      </PieCenter>
      
    );
    return (
      <ThemeProvider theme={theme}>
        
        <PieMenu centerRadius="30px" Center={Center}>

          {
            choice === CLOSED && (
              <>
             
              </>
            )
          }
          
          {choice === 0 && (
            <>
              <Slice onSelect={(e) => this.SelectedMood("happy",faSmile)} attrs={{ filled: `${happy != null}` }}>
                <FontAwesomeIcon icon={happy || faSmile} size="2x" />
              </Slice>
              <Slice onSelect={(e) => this.SelectedMood("content",faGrinBeam)} attrs={{ filled: `${happy != null}` }}>
                <FontAwesomeIcon icon={happy || faGrinBeam} size="2x" />
              </Slice>
              <Slice onSelect={(e) => this.SelectedMood("surprized", faSurprise)} attrs={{ filled: `${scared != null}` }}>
                <FontAwesomeIcon icon={scared || faSurprise} size="2x" />
              </Slice>   
              <Slice onSelect={(e) => this.SelectedMood("Hysterical", faGrinSquintTears)} attrs={{ filled: `${scared != null}` }}>
                <FontAwesomeIcon icon={scared || faGrinSquintTears} size="2x" />
              </Slice> 
              <Slice onSelect={(e) => this.SelectedMood("Excited", faGrinStars)} attrs={{ filled: `${scared != null}` }}>
                <FontAwesomeIcon icon={scared || faGrinStars} size="2x" />
              </Slice> 
              <Slice onSelect={(e) => this.SelectedMood("silly", faGrinTongueSquint)} attrs={{ filled: `${scared != null}` }}>
                <FontAwesomeIcon icon={scared || faGrinTongueSquint} size="2x" />
              </Slice>

              

              <Slice onSelect={(e) => this.SelectedMood("frustrated", faSadCry)} attrs={{ filled: `${sad != null}` }}>
                <FontAwesomeIcon icon={sad || faSadCry} size="2x" />
              </Slice>
              <Slice onSelect={(e) => this.SelectedMood("angry", faAngry)} attrs={{ filled: `${angry != null}` }}>
                <FontAwesomeIcon icon={angry || faAngry} size="2x" />
              </Slice>
              <Slice onSelect={(e) => this.SelectedMood("sad", faFrown)} attrs={{ filled: `${scared != null}` }}>
                <FontAwesomeIcon icon={scared || faFrown} size="2x" />
              </Slice>   
              <Slice onSelect={(e) => this.SelectedMood("meh", faMeh)} attrs={{ filled: `${meh != null}` }}>
                <FontAwesomeIcon icon={meh || faMeh} size="2x" />
              </Slice>
              <Slice onSelect={(e) => this.SelectedMood("scared", faGrimace)} attrs={{ filled: `${scared != null}` }}>
                <FontAwesomeIcon icon={ faGrimace} size="2x" />
              </Slice> 

            
              <Slice onSelect={(e) => this.SelectedMood("worried", faFlushed)} attrs={{ filled: `${scared != null}` }}>
                <FontAwesomeIcon icon={scared || faFlushed} size="2x" />
              </Slice>               
              <Slice onSelect={(e) => this.SelectedMood("Tired", faDizzy)} attrs={{ filled: `${scared != null}` }}>
                <FontAwesomeIcon icon={scared || faDizzy} size="2x" />
              </Slice>               


              <Slice onSelect={(e) => this.SelectedMood("dissapointed", faMehRollingEyes)} attrs={{ filled: `${scared != null}` }}>
                <FontAwesomeIcon icon={scared || faMehRollingEyes} size="2x" />
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
        <p
        align="center"
        >{this.mood}</p>
      </ThemeProvider>
    );
  }
}
