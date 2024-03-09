import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500"></Menu>
      </SheetTrigger>
      <SheetContent className="space-y-3" >
        <SheetTitle>
          <span> Welcome to Yamyam.com</span>
        </SheetTitle>
        <Separator> </Separator>
        <SheetDescription className="flex">
          <Button className="flex-1 font-bold bg-orange-500">Log in</Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
