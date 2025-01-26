import { Link,useNavigate} from "react-router-dom";
import "./Auth.css";
import { useState} from "react";
import { useUserData } from "../../context/userContext";
import FetchUserComponent from "../../middleware/fetchUser";
export default function login(){  
    const navigate=useNavigate();
    const {btnLoading,loginUser}=useUserData();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const submitHandler=async(e)=>{
        e.preventDefault();
       await loginUser(email,password,navigate);
    }
    return (
        <>
        <FetchUserComponent path="/login"/>
        <div className="auth-page">
            <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor="email">Email</label>
                    <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} required></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                    <button disabled={btnLoading} className="common-btn" type="submit">
                        {btnLoading?"please wait ...":"login"}
                    </button>
                </form>
                <p>
                   Don't have an account? <Link to={"/register"}>Register</Link> 
                </p>
            </div>
        </div>
        </>
    )
}