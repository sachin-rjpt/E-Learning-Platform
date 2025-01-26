import { useParams,Link } from "react-router-dom";
import { CourseData } from "../../context/courseContext";
import "./CourseDescription.css";
import { useUserData } from "../../context/userContext";
import { useEffect, useState } from "react";
import { server } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
export default function CourseDescription(){
    const navigate=useNavigate();
     const {isAuth,user,fetchUser,btnLoading,setBtnLoading}=useUserData();
     const {id}=useParams();
     const {course,fetchCourse,fetchCourses}=CourseData();
      useEffect(()=>{
        fetchUser();
        fetchCourse(id);
      },[]);
      const checkoutHandler=async()=>{
          const {data}=await axios.post(`${server}/course/checkout/${id}`,{},{withCredentials:true});
       const options = {
            "key": "rzp_test_ioz0TIfuNylI5k", // Enter the Key ID generated from the Dashboard
            "amount": course.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "E Learning", //your business name
            "description": "grow with us",
            "order_id": data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

            handler:async function(response){
              const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=response;
              try{
                const {Vdata}=await axios.post(`${server}/course/verification/${id}`,{razorpay_order_id,razorpay_payment_id,razorpay_signature},{withCredentials:true});
                await fetchUser();
                await fetchCourses();
                 toast.success(Vdata.success);
                 navigate(`/payment-success/${razorpay_payment_id}`);
              }catch(error){
                toast.error(error.response.data.message);
              }
            },
          theme:{
            color:"#8a4baf",
          },  
      };
      const razorpay=new window.Razorpay(options);
      razorpay.open();
    }
     return (
         <div className="course-description-page">
           <div className="course-description">
                <img src={`${server}/${course.image}`} alt="course-Thumbnail"/>
                <div className="course-info">
                <h2>Category:{course.category}</h2>
                    <p><strong>Title : {course.title}</strong></p>
                   <p>instructor : {course.createdBy} </p> 
                   <p> duration   : {course.duration}  </p>
                   <p> price      :  {course.price}&#x20B9;/- </p>
                   {isAuth&&user.role==="admin"?
                   <button className="common-btn" onClick={()=>navigate(`/courses/study/${course._id}`)}>Go to Lectures</button>
                   :isAuth&&user.subscription.includes(course._id)?
                    <button className="common-btn" onClick={()=>navigate(`/courses/study/${course._id}`)}>Go to Lectures</button>
                   :isAuth?<button className="common-btn" onClick={checkoutHandler}>Buy Now!</button>:<Link className="common-btn" to={"/login"}>Buy Now!</Link>
                   }
                 </div>
              </div>
         </div>
     );
}