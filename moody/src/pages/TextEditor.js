
import React from "react";
import TextEditor from '../components/TextEditor';
import '../components/Text.css'
import RadialMenu from "../components/RadialMenu"


class App extends React.Component {
  constructor(props){
    super(props);
    this.mood = "hello"
    this.state = {
    moodState: "help",
    text: "",
    }
  }
  
  getmood = (mood) =>{
    this.mood = mood
  }
  getText = (text) =>{
    this.state.text = text
  }

  onSubmit() {
   
    console.log(this.mood)
    console.log(this.state.text)
    // console.log(this.state.text)
  }

  render() {
    return (
      <div className="App">
         
        <main>
          <TextEditor textSend = {this.getText}/>
        <div >
        <button 
        className = "boton"
          onClick={(e)=>this.onSubmit()}

          >Send
        </button>
        </div>
        <div className="radial">
          <RadialMenu 
            pageSend = {this.getmood}
          />
        </div>
        </main>

      </div>
    );
  }
}

export default App;