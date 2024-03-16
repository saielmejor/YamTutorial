//file to interact serverside api

import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
    //get user token 

    const {getAccessTokenSilently}=useAuth0()
  // create user request
  const createMyUserRequest = async (user: CreateUserRequest) => { 
    //retrieves the access token
    const accessToken=await getAccessTokenSilently()
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization:`Bearer ${accessToken}`, //pass the access token
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
