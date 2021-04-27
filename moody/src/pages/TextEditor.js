
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

  onSubmit() {
   
    console.log(this.mood)
    // console.log(this.state.text)
  }

  render() {
    return (
      <div className="App">
         
        <main>
          <TextEditor />
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