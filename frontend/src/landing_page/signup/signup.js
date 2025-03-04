import React from "react";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



function Signup(){
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3003/Signup', {
                name,
                email,
                password,
            });
            if (response.data.success) {
                setMessage('Signup successful!');
                setname('');
                setemail('');
                setpassword('');
                navigate('/Login')
            }
        } catch (error) {
            console.error(error);
            setMessage('Error signing up. Please try again.');
        }
    };
    return(
    <div className="signup_form" style={{margin:"2% 35%"}}>
        <h2  style={{margin:"0% 20%",marginBottom:"10%"}}>Signup Form</h2>
        <form onSubmit={handleSubmit} >
            <div className="form-group" style={{margin:"2% 4%"}}>
                <label style={{margin:"2% 4%"}}> Name:</label>
                <input type="text" value={name} onChange={(e) => setname(e.target.value)} required />
            </div>
            
            <div className="form-group"  style={{margin:"2% 4%"}}>
                <label style={{margin:"2% 4%"}}>Email:</label>
                <input type="email" value={email} onChange={(e) => setemail(e.target.value)} required/>
            </div>
            <div className="form-group"  style={{margin:"2% 4%"}}>
                <label style={{margin:"2% 4%"}}>Password:</label>
                <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} required/>
            </div>
            <button type="submit"  style={{padding:"10px",backgroundColor:"#00FFFF",width:"100%"}}>Signup</button>
            <p>{message}</p>
        </form>
    </div>
    )
}

export default Signup;