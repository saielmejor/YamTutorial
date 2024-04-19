import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function DetailsSection() {
  const { control } = useFormContext(); //access the API context
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Details </h2>
        <FormDescription>
          Enter the details about your restaurant
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <FormLabel> Name</FormLabel>
            <FormControl>
              {" "}
              <Input {...field} className="bg-white"></Input>
            </FormControl>
          </FormItem>
        )}
      />
      <div className="flex gap-4">
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel> City</FormLabel>
              <FormControl>
                {" "}
                <Input {...field} className="bg-white"></Input>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Country</FormLabel>
              <FormControl>
                {" "}
                <Input {...field} className="bg-white"></Input>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormField
          control={control}
          name="deliveryPrice"
          render={({ field }) => (
            <FormItem className="max-w-[25%]">
              <FormLabel> DeliveryPrice($)</FormLabel>
              <FormControl>
                {" "}
                <Input {...field} className="bg-white" placeholder="1.50"></Input>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="estimatedDeliveryTime"
          render={({ field }) => (
            <FormItem className="max-w-[25%]">
              <FormLabel> Estimated Delivery Time(minutes)</FormLabel>
              <FormControl>
                {" "}
                <Input {...field} className="bg-white" placeholder="30"></Input>
              </FormControl>
            </FormItem>
          )}
        />
        
    </div>
  );
}
