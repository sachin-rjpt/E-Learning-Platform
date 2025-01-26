import { createContext, useContext, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import {server} from "../main";
export const UserContext = createContext();
export function UserContextProvider({ children }) {
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [otp,setOtp]=useState("");
  const [user, setUser] = useState([]);
  const [isAuth, setAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  async function loginUser(email, password,navigate) {
    try {
      setBtnLoading(true);
      const { data } = await axios.post(`${server}/user/login`, { email, password },{withCredentials:true});
      toast.success("Welcome back!");
      setUser(data.user);
      setAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (err) {
      setAuth(false);
      toast.error(err.response.data);
      setBtnLoading(false);
    }
  }
  async function registerUser(navigate) {
    setBtnLoading(true);
    try{
   const {data}=await axios.post(`${server}/user/register`,{name,email,password},{withCredentials:true});
     setEmail(email);
     setBtnLoading(false);
     navigate("/verify");
     toast.success(data.message);
    }catch(err){
       toast.error(err.response.data);
       setBtnLoading(false); 
    } 
  }
  async function verifyOtp(navigate){
     setBtnLoading(true);
      try{
       const {data}=await axios.post(`${server}/user/verify`,{email,otp},{withCredentials:true});
       setUser(data.user);
       setAuth(true);
       setBtnLoading(false);
        navigate("/");
        toast.success(data.message);
      }catch(err){
        toast.error(err.response.data);
        setBtnLoading(false);
      }
  }
   async function fetchUser() {
  try {
    const { data } = await axios.get(`${server}/user/profile`,{withCredentials:true});
     setAuth(true);
    setUser(data.user);
  }catch(err){
    setAuth(false);
    toast.error(err.response.data);
  }
}
  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setAuth, loginUser, btnLoading,setBtnLoading,registerUser,verifyOtp,fetchUser,email,setEmail,name,setName,password,setPassword,otp,setOtp}}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
}

export const useUserData = () => useContext(UserContext);
