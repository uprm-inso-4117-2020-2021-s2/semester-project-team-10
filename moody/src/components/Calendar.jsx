// import React from "react";
// import { addMonths, addDays, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameMonth, isSameDay, format, toDate } from 'date-fns'
// import Link from '@material-ui/core/Link';

// class Calendar extends React.Component {
//   state = {
//     currentMonth: new Date(),
//     selectedDate: new Date()
//   };

//   renderHeader() {
//     const dateFormat = "MMMM yyyy";

//     return (
//       <div className="header row flex-middle">
//         <div className="col col-start">
//           <div className="icon" onClick={this.prevMonth}>
//             chevron_left
//           </div>
//         </div>
//         <div className="col col-center">
//           <span>{format(this.state.currentMonth, dateFormat)}</span>
//         </div>
//         <div className="col col-end" onClick={this.nextMonth}>
//           <div className="icon">chevron_right</div>
//         </div>
//       </div>
//     );
//   }

//   renderDays() {
//     const dateFormat = "EEE";
//     const days = [];

//     let startDate = startOfWeek(this.state.currentMonth);

//     for (let i = 0; i < 7; i++) {
//       days.push(
//         <div className="col col-center" key={i}>
//           {format(addDays(startDate, i), dateFormat)}
//         </div>
//       );
//     }

//     return <div className="days row">{days}</div>;
//   }

//   renderCells() {
//     const { currentMonth, selectedDate } = this.state;
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);

//     const dateFormat = "d";
//     const rows = [];

//     let days = [];
//     let day = startDate;
//     let formattedDate = "";

//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         formattedDate = format(day, dateFormat);
//         const cloneDay = day;
//         days.push(
//           <div
//             className={`col cell ${
//               !isSameMonth(day, monthStart)? "disabled": isSameDay(day, selectedDate) ? "selected" : ""
//             }`}
//             key={day}
//             // onClick={() => this.onDateClick(toDate(cloneDay))}
//             onClick={event =>  window.location.href='/text'}
//           >
//             <span className="number">{formattedDate}</span>
//             <span className="bg">{formattedDate}</span>
//           </div>
//         );
//         day = addDays(day, 1);
//       }
//       rows.push(
//         <div className="row" key={day}>
//           {days}
//         </div>
//       );
//       days = [];
//     }
//     return <div className="body">{rows}</div>;
//   }

//   onDateClick = day => {
//     this.setState({
//       selectedDate: day
//     });
//   };

//   nextMonth = () => {
//     this.setState({
//       currentMonth: addMonths(this.state.currentMonth, 1)
//     });
//   };

//   prevMonth = () => {
//     this.setState({
//       currentMonth: subMonths(this.state.currentMonth, 1)
//     });
//   };

//   render() {
//     return (
//       <div className="calendar">
//         {this.renderHeader()}
//         {this.renderDays()}
//         {this.renderCells()}
//       </div>
//     );
//   }
// }

// export default Calendar;

//NEW ATTEMPT
import React from "react";
import { Calendar, dateFnsLocalizer, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import { addMonths, addDays, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameMonth, isSameDay, format, toDate } from 'date-fns';
import parse from "date-fns/parse";
import getDay from "date-fns/getDay";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from './events';
import Link from '@material-ui/core/Link';

const locales = {
  "en-US": require("date-fns/locale/en-US")
};

// const localizer = momentLocalizer(moment);

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

//const events = [{ start: new Date(), end: new Date(), title: "JOURNAL ENTRY" }];

const DnDCalendar = withDragAndDrop(Calendar);


// const myEventsList = [
//   { start: new Date(), end: new Date(), title: "special event" }
// ];

class App extends React.Component{
  state={
    events
  };

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = (data) => {
    console.log(data);

  };

  onDateClick = (day) => {
        this.setState({
          selectedDate: day
        });
      };

  render() {
    return (
      <div className="App" onClick={()=>window.location.href='/text'}>
        <DnDCalendar
          selectable
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          onDateClick={this.onDateClick}
          resizable
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default App;

// import React from "react";
// import ReactDOM from "react-dom";
// import events from './events';
// import {Calendar, momentLocalizer} from "react-big-calendar";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import moment from "moment";

// const localizer=momentLocalizer(moment);
// const DragAndDropCalendar = withDragAndDrop(Calendar);

// class Dnd extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       events: events
//     };

//     this.moveEvent = this.moveEvent.bind(this);
//   }

//   moveEvent({ event, start, end }) {
//     const { events } = this.state;

//     const idx = events.indexOf(event);
//     const updatedEvent = { ...event, start, end };

//     const nextEvents = [...events];
//     nextEvents.splice(idx, 1, updatedEvent);

//     this.setState({
//       events: nextEvents
//     });
//   }

//   resizeEvent = (resizeType, { event, start, end }) => {
//     const { events } = this.state;

//     const nextEvents = events.map(existingEvent => {
//       return existingEvent.id == event.id
//         ? { ...existingEvent, start, end }
//         : existingEvent;
//     });

//     this.setState({
//       events: nextEvents
//     });
//   };

//   render() {
//     return (
//       <DragAndDropCalendar
//         selectable
//         events={this.state.events}
//         onEventDrop={this.moveEvent}
//         resizable
//         localizer={localizer}
//         onEventResize={this.resizeEvent}
//         defaultView="month"
//         defaultDate={new Date(2021, 4, 25)}
//       />
//     );
//   }
// }


// export default Dnd;





