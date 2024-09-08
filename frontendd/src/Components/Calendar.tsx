import React from 'react'
import { Calendar  as BigCalendar,momentLocalizer,SlotInfo } from 'react-big-calendar';
import moment from 'moment'

const localizar = momentLocalizer(moment)
interface Event {
  title: string;
  start: Date;
  end: Date;
}

const Calendar:React.FC = (props) => {
    const myEventsList = [
        {
          title: 'Meeting',
          start: new Date(2024, 8, 7, 10, 0), // Example event
          end: new Date(2024, 8, 7, 12, 0),
        },
        {
          title: 'Lunch Break',
          start: new Date(2024, 8, 8, 13, 0),
          end: new Date(2024, 8, 8, 14, 0),
        },
      ];
  return (
    <BigCalendar
    {...props}
    events={myEventsList}
    localizer={localizar}
    views={["month","week","day"]}
    selectable
    onSelectEvent={(event:Event) => alert(`Event: ${event.title}`)}
    onSelectSlot={(slotInfo:SlotInfo) => alert(`Selected slot: \n${slotInfo.start} to ${slotInfo.end}`)}
  />
  )
}

export default Calendar
