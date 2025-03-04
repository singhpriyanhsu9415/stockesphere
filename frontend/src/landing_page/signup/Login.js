import React,{useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
   const [email,setemail]=useState('');
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   
   const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post("http://localhost:3003/Login", { email, password });
        localStorage.setItem("token", data.token);
        alert("Login Successful");
        window.location.href="http://localhost:3001"
    } catch (err) {
        alert(err.response.data.msg);
    }
};

    return(
        <div className='m-5 ' style={{alignContent:"center",justifyContent:"center",justifyItems:"center"}}>
        <form  onSubmit={handleOnSubmit}>
          
          <label className='m-2'>
            Email:
            <input className='m-2' type="email" placeholder='Email' value={email} onChange={(e)=>setemail(e.target.value)} />
          </label>
          <br />
          <label className='m-2'>
            Password:
            <input className='m-2' type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}  />
          </label>
          <br />
          <button className='m-4 p-2' type="submit" style={{borderRadius:"10%"}}>Login</button>
          
        </form>
        
      </div>
    );
}

export default Login;