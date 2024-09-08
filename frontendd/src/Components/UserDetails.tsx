import React, { useState } from 'react'
import './UserDetails.css'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
interface User{
  email:string,
  _id:string
  role:string
}
const UserDetails:React.FC = () => {
  const [userLocal,setUserLocal] = useState<User>({email:"",
    _id:"",
    role:""})
    const navigate = useNavigate()
   
  
      const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        
        // Check if user data and id are present
        if (user && user.id) {
        setUserLocal(user)
        } else {
          console.log('User data is invalid or missing id.');
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    } else {
      console.log('No user data found in localStorage.');
    }
  return (
    <div>

    <Navbar/>
  
    
   
   
    <main className="main-content"
    style={{
        display:"flex",
        flexDirection:"column"
    }}
    >
      <section className="user-summary">
        <div className="user-details">
          <img className="profile-pic" src="profile-pic-url" alt="Profile" />
          <div className="user-info">
            <h2>{userLocal?.email}</h2>
          
            <p><strong>Joined:</strong> January 2022</p>
          </div>
        </div>
      </section>
      <section className="action-buttons"
      style={{
        maxWidth:"900px",
       margin:"auto"
      }}
      >
        <button className="btn available-btn" onClick={()=>{
          navigate(`setAvailability/${userLocal._id}`)
        }}
        style={{
            width:"200px"
        }}
  
        >
          Available
        </button>
        <button className="btn slot-btn"
        style={{
            width:"200px"
        }}
        onClick={()=>{
          navigate(`sessions/${userLocal._id}`)
        }}>
          Slot
        </button>
      </section>
      
      <section className="overview">
        <h3>Overview</h3>
        <p>Welcome to your professional dashboard. Here you can view your details, manage your availability, and schedule slots as needed. Use the buttons below to set your availability status or open the slot selection tool.</p>
      </section>

      <section className="recent-activities">
        <h3>Recent Activities</h3>
        <ul>
          <li>Completed the "Project X" module.</li>
          <li>Scheduled a meeting with the development team.</li>
          <li>Updated profile information.</li>
        </ul>
      </section>
      
    
    </main>
    <footer className="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  </div>
   
  )
}

export default UserDetails
