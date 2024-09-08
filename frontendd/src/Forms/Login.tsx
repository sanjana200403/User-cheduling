import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const Login:React.FC = () => {
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const navigate = useNavigate()
 
  // ===============================
  const handleLogin =async(e:React.FormEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    console.log(email,password)
    try {
      const response = await axios.post(`http://localhost:4000/login`, {email,password});
      console.log(response,"loginapi response")
      if(response.data.message){
        toast.success(response.data.message)

        if(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user));

      }
      else{
        toast.error("Something Wrong")
      }
      if(response.data.user.role=== "admin"){
          navigate('/usersuserList')
        const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        
        // Check if user data and id are present
        if (user && user.id) {
          // Navigate to the desired route
          navigate(`/`);
        } else {
          console.log('User data is invalid or missing id.');
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    } else {
      console.log('No user data found in localStorage.');
    }
      }
      
      
    } catch (error:any) {
      console.log(error)
      if(error.response.data.message){
        toast.error(error.response.data.message)
      }
    
    }
    
    
  }
  return (
    <div className="login-container">
    <div className="login-box">
      <h1>Sign In</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
          onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
          setEmail(e.target.value)
          }}
          type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
              setPassword(e.target.value)
              }}
          type="password" id="password" name="password" placeholder="Enter your password" required />
        </div>
        <button 
        className='btn'
        type="submit" onClick={(e:React.FormEvent<HTMLButtonElement>)=>{
          handleLogin(e)
        }}>Sign In</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  </div>
  )
}

export default Login
