import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import React from "react";
import { useFormContext } from "react-hook-form";

export default function CuisineSection() {
  const { control } = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold"> Cuisines </h2>
      <FormDescription> 
        Select the cuisines that your restaurant craves 
      </FormDescription>
      </div> 
      <FormField control={control}  name="cusines" render={({field})=>(
        <FormItem> 
             <div className="grid md:grid-cols-5 gap-1"> 
             {/* display cuisines option  */} 
              
             </div>
        </FormItem>
      )}/> 
    </div>
  );
}
