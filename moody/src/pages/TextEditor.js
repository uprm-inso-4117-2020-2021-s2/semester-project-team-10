
import React from "react";
import TextEditor from '../components/TextEditor';
import '../components/Text.css'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main>
          <TextEditor/>
          <button className="boton">Send</button>
        </main>
      </div>
    );
  }
}

export default App;