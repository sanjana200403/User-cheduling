import React, { useEffect, useState } from 'react';
import { SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import baseUrl from '../apis/BaseRoute';

interface SetAvailabilityFormProps {
  slotInfo: SlotInfo | null;
  userId: string;
  setAvailability: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetAvailabilityForm: React.FC<SetAvailabilityFormProps> = ({ slotInfo, userId, setAvailability }) => {
  const [title, setTitle] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  useEffect(() => {
    if (slotInfo) {
      const startDate = moment(slotInfo.start).format('YYYY-MM-DDTHH:mm');
      const endDate = moment(slotInfo.end).format('YYYY-MM-DDTHH:mm');
      setStart(startDate);
      setEnd(endDate);
      console.log(startDate, endDate, "start and end date");
    }
  }, [slotInfo]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // API call to create availability
    try {
      const response = await fetch(`http://localhost:4000/api/availability`, { // replace '/api/availability' with your actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          title,
          start,
          end,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      const result = await response.json();
      console.log('Availability created:', result);
      alert('Availability created successfully!');
      setAvailability(false);
    } catch (error) {
      console.error('Error creating availability:', error);
      alert('Failed to create availability. Please try again.');
    }
  };

  return (
    <div className="set-availability-form">
      <div className="form-header">
        <h2>Set Availability Form</h2>
      </div>
      <form onSubmit={handleSubmit} className="availability-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="start">Start Date:</label>
          <input type="text" disabled value={start} id="start" required />
        </div>
        <div className="form-group">
          <label htmlFor="end">End Date:</label>
          <input type="text" disabled value={(end)} id="end" required />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">Submit</button>
          <button
            type="button"
            className="close-button"
            onClick={() => {
              setAvailability(false);
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetAvailabilityForm;
