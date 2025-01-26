import { useEffect } from "react";
import Testimonials from "../../components/testimonials/testimonials";
import { useUserData } from "../../context/userContext";
import FetchUserComponent from "../../middleware/fetchUser";
import "./home.css";
import { useNavigate } from "react-router-dom";
export default function(){
   const navigate=useNavigate();
    const {fetchUser,isAuth}=useUserData();
    useEffect(()=>{
      fetchUser();
    },[]);
    return ( 
      <>
   <div className="home">
      <div className="home-content">
        <h1>Welcome to our E-learning Plateform</h1>
        <p>Learn, Grow, Excel</p>
        <button onClick={()=>navigate("/courses")} className="common-btn">Get Started</button>
      </div>
   </div>
    <Testimonials/>
    </>
    );
}