import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import SessionForm from './SessionForm';
import { useParams } from 'react-router-dom';
import './Session.css';
import { toast } from 'react-toastify';
import Navbar from './Navbar';

const localizar = momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
}

const Sessions: React.FC = () => {
  const [eventInfo, setEventInfo] = useState<Event | null>(null);
  const [slotInfo, setSlotInfo] = useState<SlotInfo | null>(null);
  const [showSessionForm, setShowSessionForm] = useState<boolean>(false);
  const [myEventsList, setMyEventsList] = useState<Event[]>([]);  // State to hold the fetched events

  const params = useParams();
  const userId = params.userId as string;

  // Fetch sessions from the backend API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/sessions/${userId}`); // Adjust the URL to your API endpoint
        const data = await response.json();
        
        if (response.ok) {
          // Convert session data to the required format for the calendar
          const sessions = data.sessions.map((session: any) => ({
            title: session.title || 'No Title', // Set a default title if title is missing
            start: new Date(session.start),    // Convert to Date object
            end: new Date(session.end),        // Convert to Date object
          }));

          setMyEventsList(sessions);
        } else {
          console.error('Failed to fetch sessions:', data.message);
          
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, [userId,showSessionForm]);

  return (
    <div>
      {!showSessionForm && (
        <div
          style={{
            width: '100vw',
            height: '100vh',
          }}
        >
            <Navbar/>
          <BigCalendar
            events={myEventsList}
            localizer={localizar}
            defaultView="week"
            views={['month', 'week', 'day']}
            selectable
            onSelectEvent={(event: Event) => alert(`Event: ${event.title}`)}
            onSelectSlot={(slotInfo: SlotInfo) => {
              setShowSessionForm(true);
              setSlotInfo(slotInfo);
            }}
          />
        </div>
      )}
      {showSessionForm && (
        <SessionForm slotInfo={slotInfo} userId={userId} setShowSessionForm={setShowSessionForm} />
      )}
    </div>
  );
};

export default Sessions;
