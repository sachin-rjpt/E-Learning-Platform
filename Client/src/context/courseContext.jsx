import axios from "axios";
import { createContext, useContext, useState } from "react";
import { server } from "../main";
import toast from "react-hot-toast";

const CourseContext=createContext();
export function CourseContextProvider({children}){
    const [lecture,setLecture]=useState([]);
    const [lectures,setLectures]=useState([]);
     const [courses,setCourses]=useState([]);
     const [course,setCourse]=useState([]);
     const [myCourses,setMyCourses]=useState([]);
     async function fetchCourses() {
        try{
        const {data}= await axios.get(`${server}/course/all`,{withCredentials:true});
         setCourses(data.courses);
        }catch(err){
            toast.error(err.response.data);
        }
     }
     async function fetchCourse(id) {
        try{
            const {data}=await axios.get(`${server}/course/${id}`,{withCredentials:true});
            setCourse(data.course);
        }catch(err){
            toast.error(err.response.data);
        }
     }
     async function fetchLectures(id) {
        try{
            const {data}=await axios.get(`${server}/lecture/${id}`,{withCredentials:true});
            setLectures(data.lectures);
        }catch(err){
            toast.error(err.response.data);
        }
     }
     async function fetchLecture(id,lec_id) {
        try{
            const {data}= await axios.get(`${server}/lecture/${id}/${lec_id}`,{withCredentials:true});
            setLecture(data.lecture);
        }catch(err){
            toast.error(err.response.data);
        }
     }
     async function fetchMyCourses() {
          try{
            const {data}=await axios.get(`${server}/course/myCourses`,{withCredentials:true});
            setMyCourses(data.courses);
          }catch(err){
            toast.error(err.response.data);
          }
     }
     return <CourseContext.Provider value={{courses,fetchCourses,course,fetchCourse,lecture,lectures,fetchLecture,fetchLectures,myCourses,fetchMyCourses}}>{children}</CourseContext.Provider>
};
export const CourseData = () => useContext(CourseContext);