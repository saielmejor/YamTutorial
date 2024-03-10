import React from "react";

import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

type props = {
  children: React.ReactNode;
};

function Auth0ProviderWithNavigate({ children }: props) {
  const domain = import.meta.env.VITE_AUTH_DOMAIN as string;


  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string ;

  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL ;

//   if (!domain || !clientId || !redirectUri) {
//     throw new Error("unable to initialise auth ");
//   }
  const onRedirectCallBack=(appState ? :AppState, user?:User)=>{
    console.log("USER", user); 
  }
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        
      }}
      onRedirectCallback={onRedirectCallBack}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithNavigate;
