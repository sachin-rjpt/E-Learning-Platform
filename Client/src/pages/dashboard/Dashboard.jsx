import { useEffect, useState } from "react";
import { useUserData } from "../../context/userContext";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { CourseData } from "../../context/courseContext";
import CourseCard from "../../components/courseCards/courseCard";
export default function dashboard(){
   const navigate=useNavigate();
    const {isAuth,fetchUser,user}=useUserData();
    const {myCourses,fetchMyCourses}=CourseData();
    const [firstRender,setFirstRender]=useState(true);
    useEffect(()=>{
      fetchUser().finally(()=>setFirstRender(false));
      fetchMyCourses();
    },[]);
    useEffect(()=>{
    if(!firstRender&&!isAuth){
      navigate("/login");
    }
  },[firstRender]);
    return (
      <div className="dash-page">
       <div className="user-info">
        <p>Name : {user.name}</p>
        <p>Email : {user.email}</p>
       </div>
       <div className="user-courses">
       {myCourses.length==0?"no course purchased yet ":myCourses.map((course)=>(
        <CourseCard key={course._id} course={course}/>
       ))}
       </div>
      </div>
    );
  }
