
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

function JournalCalendar(props) {
  const events= [
    {
      id: 0,
      title: "Journal1: Im feeling very sad",
      start: new Date(2021, 3, 1), //the dates are wrong, they a month behind
      end: new Date(2021, 3, 1)
    },
    {
      id: 1,
      title: "Journal2:I want to dance",
      start: new Date(2021, 3, 15),
      end: new Date(2021, 3, 15)
    },
    {
      id: 2,
      title: "Journal3:Im super angry with life",
      start: new Date(2021, 3, 20),
      end: new Date(2021, 3, 20)
    },
    {
      id: 3,
      title: "So Happy...",
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() - 3))
    },
    {
      id: 3,
      title: "Today was great",
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() - 3))
    }
  ];

    return (
      <div >
        <DnDCalendar
          selectable
          defaultView="month"
          events={events}
          localizer={localizer}
          onDateClick={(e) => console.log("dateclick", e)}
          onSelectSlot={(e)=>console.log(e)}
          resizable
          style={{ height: "60vh" }}
        />
      </div>
    );
  }

export default JournalCalendar;
