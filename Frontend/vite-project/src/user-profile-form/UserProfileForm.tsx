import React from "react";
import PropTypes from "prop-types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
const formSchema = z.object({
  email: z.string().optional(), // add optional,
  name: z.string().min(1, "name is required"), // needs to have at least one character
  addressLine1: z.string().min(1, "Address Line 1 is required "),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

type UserFormData = z.infer<typeof formSchema>; //z.infer used to detect the type

type props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
};
//destructuring to capture onSave and is Loading
function UserProfileForm({ onSave, isLoading }: props) {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        className="space-y-4 bg-gray-50 rounded-lg md:p-10 "
      >
        <div>
          <h2 className="text-2xl font-bold">User Profile Form </h2>
          <FormDescription>
            {" "}
            View and change your profile information her{" "}
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white"></Input>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white"></Input>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row gap-4"></div>
        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white"></Input>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City </FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white"></Input>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} disabled className="bg-white"></Input>
              </FormControl>
            </FormItem>
          )}
        />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            Submit
          </Button>
        )}
      </form>{" "}
    </Form>
  );
}

UserProfileForm.propTypes = {};

export default UserProfileForm;
