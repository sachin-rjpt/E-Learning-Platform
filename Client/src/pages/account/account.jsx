import "./account.css";
import { MdDashboard } from "react-icons/md";
import { useUserData } from "../../context/userContext";
import FetchUserComponent from "../../middleware/fetchUser";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";
import { IoMdLogOut } from "react-icons/io";
import { useState } from "react";
export default function Account(){
     const {user,setAuth,setUser}=useUserData();
     const [loading,setLoading]=useState(false);
     const navigate=useNavigate();
     const LogoutUser=async()=>{
    try{
      const {data}= await axios.get(`${server}/user/logout`,{withCredentials:true});
       setAuth(false);
       setUser([]);
       navigate("/");
       toast.success(data.message);
    }
    catch(err){
      toast.error(err.response.data);
    }

}
 const handleNavigate=()=>{
   navigate("/dashboard");
 }
    return (
        <>
        <FetchUserComponent path="/account"/>
        <div className="profile-page">
       <div className="profile">
         <h2>My Profile</h2>
         <div className="profile-info">
            <p>
                <strong>Name - {user.name}</strong>
            </p>
            <p>
                <strong>Email - {user.email}</strong>
            </p>
            <button className="common-btn" onClick={handleNavigate}><MdDashboard />Dashboard</button>
            <button className="common-btn dlt-btn" onClick={LogoutUser} ><IoMdLogOut />Logout</button>
         </div>
       </div>
       </div>
       </>
    )
}