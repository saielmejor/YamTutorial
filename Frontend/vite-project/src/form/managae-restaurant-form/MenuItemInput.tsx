import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  index: number;
  removeMenuItem: () => void;
};
function MenuItemInput({ index, removeMenuItem }: Props) {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) =>(<FormItem>
            <FormLabel className="flex items-center gap-1">
                Name <FormMessage />
            </FormLabel>
            <FormControl> <Input {...field} placeholder="Cheese pizza " className="bg-white"></Input>  </FormControl>
        </FormItem>) }
      />
         <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) =>(<FormItem>
            <FormLabel className="flex items-center gap-1">
                Price（￥）<FormMessage />
            </FormLabel>
            <FormControl> <Input {...field} placeholder="8.00" className="bg-white"></Input>  </FormControl>
        </FormItem>) }
      />
      <Button type="button" onClick={removeMenuItem} className=""></Button>
    </div>
  );
}

export default MenuItemInput;
