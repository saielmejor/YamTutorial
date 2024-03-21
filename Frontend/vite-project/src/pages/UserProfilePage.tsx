import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/user-profile-form/UserProfileForm";

export default function UserProfilePage() {
    const {currentUser,isLoading:isGetLoading}=useGetMyUser()
  const { updateUser, isLoading:isUpdateLoading } = useUpdateMyUser();
//handle the get request
if(isGetLoading){ 
    return <span> Loading.... </span>
}

  // it will call API for updateuser and loading
  return <UserProfileForm onSave={updateUser} isLoading={isUpdateLoading} />;
}
 