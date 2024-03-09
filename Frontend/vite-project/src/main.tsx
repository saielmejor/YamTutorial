import React from 'react'
import ReactDOM from 'react-dom/client'

import './global.css'
import {BrowserRouter as Router} from "react-router-dom" 
import AppRoutes from './AppRoutes'


ReactDOM.createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>
    <Router>
      <AppRoutes/>  
      {/* app routes keep it a little bit cleaner  */}
    </Router>
  </React.StrictMode>,
)