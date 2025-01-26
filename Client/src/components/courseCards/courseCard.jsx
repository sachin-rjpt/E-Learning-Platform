import { Link, useNavigate} from "react-router-dom";
import { useUserData } from "../../context/userContext";
import { server } from "../../main";
import "./courseCard.css";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
export default function CourseCard({course}){
          const {user,isAuth}=useUserData();
          const [btnLoading,setBtnLoading]=useState(false);
          const navigate=useNavigate();
          const handleDelete=async()=>{
            setBtnLoading(true);
            try{
             const {data}=await axios.delete(`${server}/admin/course/${course._id}`,{withCredentials:true});
             toast.success(data.message);
             setBtnLoading(false);
             window.location.reload();
            }catch(err){
               toast.error(err.response.data);
               setBtnLoading(false);
            }
          }
         return (
         <>
              <div className="course-card">
                <img src={`${server}/${course.image}`} alt="course-Thumbnail"/>
                <div className="course-info">
                   <p>instructor : {course.createdBy} </p> 
                   <p> duration   : {course.duration}  </p>
                   <p> price      :  {course.price}&#x20B9;/- </p>
                   {isAuth&&user.role==="admin"?<div className="buttons">
                   <button className="common-btn" onClick={()=>navigate(`/courses/${course._id}`)}>Study</button>
                   <button className="common-btn dlt-btn"onClick={handleDelete} disabled={btnLoading}>Delete</button></div>
                   :isAuth&&user.subscription.includes(course._id)?
                    <button className="common-btn" onClick={()=>navigate(`/courses/${course._id}`)}>Study</button>
                   :isAuth?<Link className="common-btn" to={`/courses/${course._id}`}>Enroll Now!</Link>:<Link className="common-btn" to={"/login"}>Enroll Now!</Link>
                   }
                 </div>
              </div>
              </>
         )
}