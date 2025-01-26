import { Link,useNavigate} from "react-router-dom";
import "./Auth.css";
import FetchUserComponent from "../../middleware/fetchUser";
import { useUserData } from "../../context/userContext";
import { useState } from "react";
export default function verify(){
    const navigate=useNavigate();
    const {btnLoading,verifyOtp,otp,setOtp}=useUserData();
   const  handleSubmit=async()=>{
        await verifyOtp(navigate);
   }
    return (
      <>
      <FetchUserComponent path="/verify"/>
        <div className="auth-page">
            <div className="auth-form">
                <h2>Verify OTP</h2>
                <form>
                    <label htmlFor="otp">OTP</label>
                    <input type="text" onChange={(e)=>setOtp(e.target.value)} required></input>
                    <button className="common-btn" onClick={handleSubmit} disabled={btnLoading}>{btnLoading?"please wait...":"verify"}</button>
                </form>
                <p>
                   go to <Link to={"/login"}>login</Link> page
                </p>
            </div>
        </div>
        </>
    )
}