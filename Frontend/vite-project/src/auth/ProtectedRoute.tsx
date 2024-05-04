import { useAuth0 } from '@auth0/auth0-react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Progress } from "@/components/ui/progress"
import { Navigate, Outlet } from 'react-router-dom'


export default function ProtectedRoute() {

    const {isAuthenticated,isLoading}=useAuth0(); 
    if (isLoading){ 
      // eslint-disable-next-line react-hooks/rules-of-hooks
    
      return  <Progress className="grid justify-items-center w-[40%] bg-slate-950 " />
      
    } 
    if(isAuthenticated){ 
      return <Outlet/>  
      // returns all the childs outlet 

    }

    return <Navigate to="/" replace/>
  // return isAuthenticated? (<Outlet></Outlet>): (<Navigate to="/" replace/>)
}
