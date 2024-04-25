import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisineSection from "../CuisineSection";

type restaurantFormData = z.infer<typeof formSchema>;
const formSchema = z.object({
  restaurantName: z.string({
    required_error: " restaurant is required",
  }),
  city: z.string({
    required_error: " city is required",
  }),
  country: z.string({
    required_error: " country is required",
  }),
  deliveryPrice: z.coerce.number({
    required_error: " delivery price is required",
    invalid_type_error: " must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: " please select at least one item ",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      price: z.coerce.number().min(1, "price is required"),
    })
  ),
  imageFile: z.instanceof(File, { message: "image is required" }),
});

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};
function ManageRestaurantForm({onSave,isLoading}: Props) {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });
  const onSubmit = (formDataJson: restaurantFormData) => {
    //TODO onver formDataJson to a new FormData object
  };
  //add form components
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection /> 
        <Separator/> 
        <CuisineSection/> 
      </form>
    </Form>
  );
}

export default ManageRestaurantForm;
