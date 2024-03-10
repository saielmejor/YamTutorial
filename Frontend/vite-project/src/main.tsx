import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.css'
import {BrowserRouter as Router} from "react-router-dom" 
import AppRoutes from './AppRoutes'
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate'



ReactDOM.createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>
    <Router>
   <Auth0ProviderWithNavigate> 
   <AppRoutes/> 

   </Auth0ProviderWithNavigate>
        {/* add app routes into auth0  */}
    
      {/* app routes keep it a little bit cleaner  */}

   
    </Router>
  </React.StrictMode>,
)
