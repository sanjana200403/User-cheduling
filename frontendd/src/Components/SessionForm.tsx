import React, { useEffect, useState } from 'react';
import moment from 'moment';
import baseUrl from '../apis/BaseRoute'; // Adjust based on your API route
import { SlotInfo } from 'react-big-calendar';


interface CreateSessionFormProps {
  slotInfo: SlotInfo | null;
  userId: string;
  setShowSessionForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  _id: string;
  email: string;
  name: string;
}

const CreateSessionForm: React.FC<CreateSessionFormProps> = ({ slotInfo, userId, setShowSessionForm }) => {
  const [title, setTitle] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useEffect(() => {
    // Populate start and end dates based on selected slot
    console.log("slotInfo","in session",slotInfo)
    if (slotInfo) {
      const startDate = moment(slotInfo.start).format('YYYY-MM-DDTHH:mm');
      const endDate = moment(slotInfo.end).format('YYYY-MM-DDTHH:mm');
      setStart(startDate);
      setEnd(endDate);
    }
  }, [slotInfo]);

  useEffect(() => {
    // Fetch list of users to display in the select dropdown
    const fetchUsers = async () => {
        try {
          const response = await fetch(`http://localhost:4000/users`);
          if (!response.ok) {
            const errorText = await response.text(); // Get the raw text response
            console.error('Error fetching users:', errorText);
            throw new Error('Failed to fetch users');
          }
          const data = await response.json(); // Attempt to parse JSON
          console.log(data, "allusers");
          setUsers(data.users);
        } catch (error) {
          console.error('Error fetching users:', error);
          alert('Error fetching users. Please try again.');
        }
      };
    fetchUsers();
  }, []);

  const handleSelectUser = (user: User) => {
    if (!selectedUsers.some((selected) => selected._id === user._id)) {
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Format attendees array
    const formattedAttendees = selectedUsers.map(user => ({
      userId: user._id,
      email: user.email,
    }));

    // API call to create session
    try {
        console.log('title',title)
      const response = await fetch(`http://localhost:4000/api/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          title,
          start,
          end,
          attendees: formattedAttendees,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      const result = await response.json();
      alert('Session created successfully!');
      setShowSessionForm(false);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session. Please try again.');
    }
  };

  return (
    <div className="create-session-form">
      <div className="form-header">
        <h2>Create Session</h2>
      </div>
      <form onSubmit={handleSubmit} className="session-form">
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
          <input type="text" disabled value={slotInfo?.start.toLocaleString()} id="start" required />
        </div>
        <div className="form-group">
          <label htmlFor="end">End Date:</label>
          <input type="text" disabled value={slotInfo?.end.toLocaleString()} id="end" required />
        </div>
        <div className="form-group">
          <label htmlFor="attendees">Select Attendees:</label>
          <select
            id="attendees"
            onChange={(e) => {
              const selectedUser = users.find(user => user._id === e.target.value);
              if (selectedUser) handleSelectUser(selectedUser);
            }}
          >
            <option value="">Select User</option>
            {users?.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>
        <div className="selected-users">
          {selectedUsers.map((user) => (
            <div key={user._id} className="selected-user-chip">
              ({user.email})
              <button type="button" onClick={() => handleRemoveUser(user._id)}>
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">Submit</button>
          <button
            type="button"
            className="close-button"
            onClick={() => setShowSessionForm(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSessionForm;
