import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Dashboard from '../components/Dashboards/dashboard';

const Private = ({ history }) => {
    const Error = useState("You are not authorized, please login")
   
    const [privateData, setPrivateData] = useState("");
    const isLogin =useState(true);
    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            history.push("/login")
        }

        fetchData()
        
    }, [history])
    
    const fetchData = async () => {
        const token = "authToken"
        
        try {
           
            const resp = await axios({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`},
                url: "/api/private",
            })
            const data=await resp.json()
            setPrivateData(data)
        } catch (error) {
            localStorage.removeItem("authToken")
           
        }

    }
    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }

    return (
     <div>
          {isLogin  ?
          <Dashboard/>: 
null
          }  
               
                
                    
             
           
     </div>
    )
}

export default Private
