import { useEffect,useState} from "react";
import { useUserData } from "../../../context/userContext";
import "./lecture.css";
import { CourseData } from "../../../context/courseContext";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../../main";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
export default function Lectures(){
    const {id}=useParams();
    const navigate=useNavigate();
    const {isAuth,user,fetchUser}=useUserData();
    const {fetchLecture,fetchLectures,lectures,lecture}=CourseData();
    const [btnLoading,setBtnLoading]=useState(false);
    useEffect(()=>{
       fetchLectures(id);
       fetchUser();
       if(!isAuth||(user.role!=="admin"&&!user.subscription.includes(id))){
        navigate(`/courses/${id}`);
     }
    },[]);
   async function handleDelete(id){
    setBtnLoading(true);
    try{
     const {data}=await axios.delete(`${server}/admin/lecture/${id}`,{withCredentials:true});
     toast.success(data.message);
     setBtnLoading(false);
     window.location.reload();
    }catch(err){
       toast.error(err.response.data);
       setBtnLoading(false);
    }
  }
    return (
       <div className="lectures-page">
        {lectures&&lectures.length>0?
        <>
        <div className="left">
                {lecture&&lecture.video?<video 
                width={"100%"}
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                autoPlay
                src={`${server}/${lecture.video}`}></video>
                 :"press any lecture to play it"}
        </div>
        <div className="right">
            <div className="lectures">
                {lectures.map((e)=>(
                    <div key={e._id} onClick={()=>fetchLecture(id,e._id)} className="lecture">
                       {e.title}
                       <button className="dlt-btn delete" disabled={btnLoading} onClick={(event)=>{
                        event.stopPropagation();
                        handleDelete(e._id)
                    }} ><MdDelete /></button>
                    </div>
                ))}
            </div>
        </div>
        </>:"No Lectures available yet"}
        {user.role==="admin"?
            <button className="common-btn" onClick={()=>navigate(`/lecture/add/${id}`)}>Add Lecture</button>:null}
       </div>
    );
}
