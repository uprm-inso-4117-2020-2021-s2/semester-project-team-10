
import React from "react";
import TextEditor from '../components/TextEditor';
import RadialMenu from "../components/RadialMenu"

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
         
        <main>
          <TextEditor/>
        </main>

        <div> <RadialMenu/> </div>
      </div>
    );
  }
}

// export default App;