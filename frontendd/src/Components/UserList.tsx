import React, { useEffect, useState } from "react";
import "./UserLists.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface User{
    email:string,
    _id:string
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // State to hold the user data
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search input
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // State to hold filtered users
const navigate = useNavigate()
  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await axios.get("http://localhost:4000/users"); // Fetch data from the API
        console.log("users", response);
        setUsers(response.data.users); // Set users state with fetched data
        setFilteredUsers(response.data.users); // Initially, filtered users are the same as all users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchUsers();
  }, []);

  // Debouncing function for the search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered:User[] = users.filter((user:User) =>
        user?.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered); // Update filtered users based on search query
    }, 500); // Delay of 500 milliseconds

    return () => clearTimeout(timeoutId); // Cleanup timeout when searchQuery changes or component unmounts
  }, [searchQuery, users]);

  // Handlers for button clicks
  const handleSeeAvailability = (userId:string) => {
    navigate(`setAvailability/${userId}`)

  };

  const handleSeeSlots = (userId:string) => {
    navigate(`sessions/${userId}`)
  };

  return (
    <div className="table-container">
      <div className="header">
        <h1>Manage User Lists</h1>
      </div>

      {/* Search bar for filtering by email */}
      <div className="actions-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
    
      </div>

      {/* Display loading indicator when loading is true */}
      {loading ? (
        <div className="loading">Loading...</div> // Simple loading indicator
      ) : (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>User's Availabilities</th>
                <th>User's Slots</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user:User) => (
                <tr key={user?._id}>
                  <td>{user?.email}</td>
                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleSeeAvailability(user._id)}
                    >
                      See Availability
                    </button>
                  
                  </td>
                  <td className="actions">
                
                    <button
                      className="delete-btn"
                      onClick={() => handleSeeSlots(user._id)}
                    >
                      See Slots
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
