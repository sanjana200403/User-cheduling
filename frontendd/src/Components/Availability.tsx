import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import SetAvailabilityForm from './SetAvailabilityForm';
import './Availability.css';
import Navbar from './Navbar';

const localizar = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const Availability: React.FC = (props) => {
  const [availability, setAvailability] = useState<boolean>(false);
  const [eventInfo, setEventInfo] = useState<Event | null>(null);
  const [slotInfo, setSlotInfo] = useState<SlotInfo | null>(null);
  const [myEventsList, setMyEventsList] = useState<Event[]>([]);
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId as string;

  useEffect(() => {
    console.log(userId, "userid ava");

    // Fetch user availability from the backend
    const fetchAvailability = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/availability/${userId}`);
        console.log(response,"availabilty response")
        if (response.ok) {
          const data = await response.json();
            
          // Map the availability data to the event format for BigCalendar
          const events = data.map((availability: any) => ({
            title: availability.title || 'Available', // Adjust title field as per API response
            start: new Date(availability.start),      // Convert start time to Date object
            end: new Date(availability.end),          // Convert end time to Date object
          }));

          setMyEventsList(events);
        } else {
          console.error('Failed to fetch availability');
        }
      } catch (err) {
        console.error('Error fetching availability:', err);
      }
    };

    fetchAvailability();
  }, [userId,availability]);

  return (
    <div>
      {!availability && (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Navbar/>
          <BigCalendar
            {...props}
            events={myEventsList}
            localizer={localizar}
            views={['month', 'week', 'day']}
            selectable
            defaultView='week'
            onSelectEvent={(event: Event) => {
              console.log(event, 'event');
              setEventInfo(event);
            }}
            onSelectSlot={(slotInfo: SlotInfo) => {
              console.log(slotInfo);
              setSlotInfo(slotInfo);
              setAvailability(true);
            }}
            eventPropGetter={(event) => ({
                style: {
                  backgroundColor: '#ccffcc', // Very light green color for event background
                  color: 'black', // Optional: change text color to black for better visibility
                },
              })}
          />
        </div>
      )}
      {availability && (
        <SetAvailabilityForm
          slotInfo={slotInfo}
          userId={userId}
          setAvailability={setAvailability}
        />
      )}
    </div>
  );
};

export default Availability;
