import { useNavigate, useParams } from "react-router-dom";
import "../../Auth/Auth.css";
import "./lecture.css";
import { useUserData } from "../../../context/userContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../../main";
import toast from "react-hot-toast";
export default function AddLecture(){
    const {id}=useParams();
    const {user,fetchUser}=useUserData();
    const navigate=useNavigate();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [video,setVideo]=useState("");
    const [videoPrev,setVideoPre]=useState("");
    const [btnLoading,setBtnLoading]=useState(false);
    useEffect(()=>{
        fetchUser();
        if(user.role!=="admin"){
            navigate(`/course/${id}`);
        }
    },[]);
    const handleSubmit=async(e)=>{
        setBtnLoading(true);
        e.preventDefault();
        const newform=new FormData();
        newform.append("title",title);
        newform.append("description",description);
        newform.append("file",video);
        try{
            const {data}=await axios.post(`${server}/admin/lecture/${id}`,newform,{withCredentials:true});
            setBtnLoading(false);
            toast.success(data.message);
            setTitle("");
            setDescription("");
            setVideoPre("");
            setVideo("");
            navigate(`/courses/study/${id}`);
        }catch(err){
            setBtnLoading(false);
            toast.error(err.response.data);
            navigate(`/courses/study/${id}`);
        } 
    }
    const videoHandler=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>{
          setVideoPre(reader.result);
          setVideo(file);
        }
    }
    return (
        <div className="add-lecture-page auth-page">
             <h2>Add Lecture</h2>
            <div className="form auth-form">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
              <label htmlFor="description">description</label>  
              <input type="text" name="description"  value={description} onChange={(e)=>setDescription(e.target.value)} required />
              <label htmlFor="file">video</label>
              <input type="file" name="file" onChange={videoHandler}  placeholder="choose a video"required />
              {videoPrev?
                <video
                src={videoPrev}
                alt=""
                width={300}
                height={250}
                controls
                 ></video>:null
              }
              <button className="common-btn">{btnLoading?"please wait..":"Add"}</button>
            </form>
            </div>
        </div>
    )
}