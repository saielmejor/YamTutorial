import React from "react";

import {  Auth0Provider,  } from "@auth0/auth0-react";

import { useNavigate } from "react-router-dom";

type props = {
  children: React.ReactNode;
};

function Auth0ProviderWithNavigate({ children }: props) { 
 const navigate=useNavigate()
  const domain = import.meta.env.VITE_AUTH_DOMAIN as string;


  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string ;

  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL ; 

  const audience=import.meta.env.VITE_AUTH0_AUDIENCE

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("unable to initialise auth ");
  }
  const onRedirectCallBack=()=>{
    //sub is the user id 
    navigate("/auth-callback") 
    //use navigate to auth-callabck
 
  }
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri, 
        audience, // add audience 
        
      }}
      onRedirectCallback={onRedirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithNavigate;
