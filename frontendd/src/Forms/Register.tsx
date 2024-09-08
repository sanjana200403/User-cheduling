import './Login.css'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const navigate = useNavigate()
  //============ validate email ========
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email.length<0){
      toast.error("Enter Email")
      return

    }
    if(!(emailRegex.test(email)))
      toast.error("Incorrect Email")
    return 
  };
  // ============ validate Passord =====
  const validatePassword = (password: string) => {
    const minLength = 6;


    if (password.length < minLength) {
      toast.error(`Password must be at least ${minLength} characters long.`)
      return 
    }

    return ;
  };

  const handleRegister = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    validateEmail(email)
    validatePassword(password)
    console.log(email,password)
    try {
      const response = await axios.post(`http://localhost:4000/register`, {email,password});
      console.log(response,"registerapi response")
      if(response.data.message){
        toast.success(response.data.message)
      }
      else{
        toast.error("Something Wrong")
      }
      navigate("/login")

      
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
      <h1>Sign Up</h1>
      <form  onSubmit={(e:React.FormEvent<HTMLFormElement>)=>{
           handleRegister(e)
        }}>
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
        <button type="submit"
        className='btn'
       >Sign Up</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  </div>
  )
}

export default Register
