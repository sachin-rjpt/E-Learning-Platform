import { useEffect } from "react";
import { CourseData } from "../../context/courseContext";
import "./Courses.css";
import CourseCard from "../../components/courseCards/courseCard";
import FetchUserComponent from "../../middleware/fetchUser";
import { useUserData } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Courses(){
    const navigate=useNavigate();
    const {courses,fetchCourses}=CourseData();
    const {isAuth,user}=useUserData();
     useEffect(()=>{
        fetchCourses();
     },[]);
    return (
        <>
        <FetchUserComponent path="/courses"/>
        <h2 className="courses-heading">Available Courses</h2>
         <div className="courses">
            <div className="course-cards">
            {courses.length==0?"No available courses yet":courses.map((e)=>(
                <CourseCard key={e._id} course={e}/>
            ))}
            </div>
         </div>
         {isAuth&&user.role==="admin"?<button className="common-btn" onClick={()=>navigate("/courses/add")}>Add Course</button>:null}
         </>
    );
}
