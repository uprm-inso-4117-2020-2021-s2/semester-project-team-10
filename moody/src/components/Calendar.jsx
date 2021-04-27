
//NEW ATTEMPT
import React from "react";
import { Calendar, dateFnsLocalizer, momentLocalizer} from "react-big-calendar";
// import moment from "moment";
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

// const events = [{ start: new Date(), end: new Date(), title: "JOURNAL ENTRY" }];

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

  onDateClick = () => {

        window.location.href='/text'
        
    };

  render() {
    return (
      <div >
        <DnDCalendar
          selectable
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          // onEventDrop={this.onEventDrop}
          // onEventResize={this.onEventResize}
          onDateClick={this.onDateClick}
          onSelectSlot={(e)=>window.location.href='/text'}
          resizable
          style={{ height: "60vh" }}
        />
      </div>
    );
  }
}

export default App;
