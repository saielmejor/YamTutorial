import { useAuth0 } from '@auth0/auth0-react'

import { Button } from './ui/button';
import LoadingButton from './LoadingButton';
import { useLocation } from 'react-router-dom';

export default function CheckoutButton() {
    const {isAuthenticated,isLoading:isAuthLoading, loginWithRedirect}=useAuth0(); 

    const {pathname}=useLocation() // send after login in 
    
    const onLogin=async()=> { 
        await loginWithRedirect({ 
            appState:{ 
                returnTo:pathname, 
            }
        })

    }
    if(!isAuthenticated){ 
        return <Button onClick={onLogin} className='bg-orange-500 flex-1'> Log in to check out </Button>
    } 
    if(isAuthLoading){ 
        return <LoadingButton/>
    }
    
  return (
    <div>
        <Button className='bg-orange-500 flex-1' > Go to Check Out</Button>
    </div>
  )
}
