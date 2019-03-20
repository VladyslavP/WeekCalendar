import React, { Component } from 'react';
import WeekCalendar from './components/WeekCalendar';
import './App.css';

class App extends Component {
  static handleDayChange(day) {
    console.log(`Day changed: ${day}`);
  }
  static handleWeekChange({ startOfWeek, endOfWeek }) {
    console.log(`Week changed: FROM -> ${startOfWeek} TO -> ${endOfWeek}`)
  }
  render() {
    return (
      <div className="App">
        <WeekCalendar
          onWeekChange={App.handleWeekChange}
          onDayChange={App.handleDayChange}/>
      </div>
    );
  }
}

export default App;
