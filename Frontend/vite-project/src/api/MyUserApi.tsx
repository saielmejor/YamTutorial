//file to interact serverside api
import { toast } from "sonner";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { useQuery } from "react-query";
import { User } from "@/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser=()=>{ 
const {getAccessTokenSilently}=useAuth0()  
//fetch request
 const getMyUserRequest=async() :Promise<User> => {
    const accessToken=await getAccessTokenSilently() 
    const response=await fetch(`${API_BASE_URL}/api/my/user`,{ 
        method:"GET",
        headers:{ 
            Authorization:`Bearer ${accessToken}`, 
            "Content-Type":"application/json", 
        }
    }); 
    if(!response.ok){ 
        throw new Error("Failed to fetch user")
    }
    return response.json()
 }

 const { data:currentUser, isLoading, error}=useQuery("fetchCurrentUser", getMyUserRequest)
 if(error){ 
    toast.error(error.toString()) 
 }
 return {currentUser,isLoading}
}
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  //get user token

  const { getAccessTokenSilently } = useAuth0();
  // create user request
  const createMyUserRequest = async (user: CreateUserRequest) => {
    //retrieves the access token

    console.log(user.auth0Id)
    const accessToken = await getAccessTokenSilently();
    console.log(accessToken)
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, //pass the access token
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      
    });
   
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  // returns the states
  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    //fetch token
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, { 
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user ");
    }
  };

  //pass the fetch request to mutation hook

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);
  if (isSuccess) {
    toast.success("User profile updated!");
  }
  if (error) {
    toast.error(error.toString());
    reset(); //resets
  }

  //exposing content from the mutationhook
  return { updateUser, isLoading };
};
