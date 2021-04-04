import React from "react";
import Calendar from '../components/Calendar';

import '../components/Calendar.css'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main className="main-calendar">
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;