import { useEffect } from "react";
import axios from "axios";
import { useUserData } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { server } from "../main";
 function FetchUserComponent ({path="/"}){
  const navigate = useNavigate();
  const { setAuth, setUser } = useUserData();

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`${server}/user/profile`,{withCredentials:true});
        setAuth(true);
        setUser(data.user);
        if(path==="/account"||path==="/courses"){
          navigate(path);
        }
       else  navigate("/");
      } catch (err) {
        if(path==="/account"){
            navigate("/login");
          }
       else navigate(path);
       // console.log("Couldn't find user");
      }
    }
    fetchUser();
  }, []); // Add dependencies

  return null; // No UI is rendered by this component
};

export default FetchUserComponent;
