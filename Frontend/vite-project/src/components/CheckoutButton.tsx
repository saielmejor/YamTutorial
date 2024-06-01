import { useAuth0 } from '@auth0/auth0-react'

import { Button } from './ui/button';
import LoadingButton from './LoadingButton';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import UserProfileForm, { UserFormData } from '@/user-profile-form/UserProfileForm';
import { useGetMyUser } from '@/api/MyUserApi';

type Props={ 
    onCheckout:(userFormData:UserFormData)=> void ; 
    disabled: boolean; 

}

export default function CheckoutButton({onCheckout, disabled}:Props) {
    const {isAuthenticated,isLoading:isAuthLoading, loginWithRedirect}=useAuth0(); 

    const {pathname}=useLocation() // send after login in 
    const {currentUser, isLoading:isGetUserLoading}=useGetMyUser(); 

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
    if(isAuthLoading || !currentUser){ 
        return <LoadingButton/>
    }
    
  return (
    <Dialog> 
        <DialogTrigger asChild> 
            <Button disabled={disabled} className='bg-orange-500 flex-1'> Go to checkout</Button>
        </DialogTrigger> 
        <DialogContent className='max-w-[425px] mdLmin-w-[700px] bg-gray-50'> 
            {/* display the form to add details  */} 
            <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isGetUserLoading} title='Confirm Delivery Details' buttonText='Continue to payment'/> 
        </DialogContent>
    </Dialog>
  )
}