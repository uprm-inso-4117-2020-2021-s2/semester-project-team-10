
import React from "react";
import TextEntry from '../components/TextEntryComp';
import '../components/TextEntry.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main>
          <TextEntry />
        </main>
      </div>
    );
  }
}

export default App;