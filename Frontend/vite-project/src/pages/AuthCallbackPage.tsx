import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate=useNavigate()
  //access auth token

  const { user } = useAuth0(); // access login user
  const { createUser } = useCreateMyUser(); 

  const hasCreatedUser=useRef(false) 
  
  useEffect(() => {
    if (user?.sub && user?.email &&!hasCreatedUser.current) {
      createUser({ auth0Id: user.sub, email: user.email }); 
      hasCreatedUser.current=true //creates the new user 
    }  
    //navigates to home
    navigate("/")
  }, [createUser,navigate,user]);
  return <> Loading... </>
};

export default AuthCallbackPage;
