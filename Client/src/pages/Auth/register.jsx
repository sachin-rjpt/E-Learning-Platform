import { Link } from "react-router-dom";
import "./Auth.css";
import FetchUserComponent from "../../middleware/fetchUser";
import { useUserData } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function register(){
    const navigate=useNavigate();
   const {btnLoading,registerUser,email,setEmail,password,setPassword,name,setName}=useUserData();
    const handleSubmit=async(e)=>{
      e.preventDefault();
       await registerUser(navigate);
    }
    return (
        <>
        <FetchUserComponent path="/register"/>
        <div className="auth-page">
            <div className="auth-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required></input>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  required></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required></input>
                    <button className="common-btn" type="submit" disabled={btnLoading}>{btnLoading?"please wait...":"register"}</button>
                </form>
                <p>
                   have an account? <Link to={"/login"}>Login</Link> 
                </p>
            </div>
        </div>
        </>
    )
}