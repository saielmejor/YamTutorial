import ManageRestaurantForm from '@/form/managae-restaurant-form/ManageRestaurantForm'


export default function ManageRestaurantPage() {
  return <ManageRestaurantForm onSave={function (restaurantFormData: FormData): void {
      throw new Error('Function not implemented.')
  } } isLoading={false}/> 
}
