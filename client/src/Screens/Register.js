import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../components/Styles/Register.css'


const Register = ({ history }) => {
    const[name, setName]=useState("")
    const[email, setEmail]=useState("")
    const[phone, setPhone]=useState("")
    const[password, setPassword]=useState("")
    const [error, setError] =useState("")

    useEffect(()=>{
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
    }, [history]
    )

    const registerHandler = async(e)=>{
        e.preventDefault()
       const config={
        header:{
            "Content-Type":"application/json"
        }
       } 
       try {
           const {data}=await axios.post("api/auth/register",
           {name, email,phone,password}, config)
           localStorage.setItem("authToken", data.token)
           history.push("/")
       } catch (error) {
           setError(error.response.data.error)
           setTimeout(()=>{
               setError("")
           }, 5000)
           
       }
    }
    return (
        <div className="register">
            <form  onSubmit ={registerHandler} className="register__form">
                <h3 className="register__title">Register</h3>
                {error && <span className="error-message">{error}</span> }
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" 
                    placeholder="Enter name" 
                    required id="name"
                     value={name} 
                     onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" 
                    placeholder="Enter email" 
                    required id="email"
                     value={email} 
                     onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" 
                    placeholder="Enter phone" 
                    required id="phone"
                     value={phone} 
                     onChange={(e)=>setPhone(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" 
                    placeholder="Enter password" 
                    required id="password"
                     value={password} 
                     onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                <span className="register__subtext">Already have an account? <Link to="/login">Login</Link></span>
            </form>
            
        </div>
    )
}

export default Register
