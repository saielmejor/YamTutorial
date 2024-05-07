import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from '@/api/MyRestaurantApi'
import ManageRestaurantForm from '@/form/managae-restaurant-form/ManageRestaurantForm'


const ManageRestaurantPage=()=> {
  const {createRestaurant,isLoading:isCreateLoading}=useCreateMyRestaurant()
  const {restaurant}=useGetMyRestaurant() 
  const {updateRestaurant, isLoading:isUpdateLoading}= useUpdateMyRestaurant() 

  const isEditing=!!restaurant; 


  return <ManageRestaurantForm  restaurant={restaurant} onSave={isEditing ? updateRestaurant: createRestaurant } isLoading={isCreateLoading || isUpdateLoading} />  
  // conditional to add is creating and is loading
  
}
export default ManageRestaurantPage
