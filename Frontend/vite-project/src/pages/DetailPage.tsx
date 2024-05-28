import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItemed from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";

import RestaurantInfo from "@/components/RestaurantInfo";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";

import { useParams } from "react-router-dom";
import { MenuItem } from "@/types";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function DetailPage() {
  // get the restaurant ID
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>([]); // initialize the state with an empty array

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      // 1 check if item is already in the cart
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      ); 
      let updatedCartItems; 
      // 2 if item is in cart, update the quantity 
      if (existingCartItem){ 
        updatedCartItems=prevCartItems.map((cartItem)=>cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity +1 }: cartItem)
      }else{ 
        updatedCartItems=[ 
            ...prevCartItems, 
            { 
                _id:menuItem._id , 
                name: menuItem.name, 
                price: menuItem.price, 
                quantity:1,
            }
        ]
      }
      // 3 if item is not in cart , add it as a new item
      return updatedCartItems
    });
  }; 
  // remove the cart item that was clicked 
  const removeFromCart=(cartItem:CartItem)=>{ 
    setCartItems((prevCartItems)=>{ 
        const updatedCartItems=prevCartItems.filter((item)=> cartItem._id !== item._id)
         return updatedCartItems
    })
  }
  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className="rounded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />{" "}
          <span className="text-2xl font-bold tracking-tight"> Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItemed menuItem={menuItem} addToCart={()=>addToCart(menuItem)}/>
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
          </Card>
        </div>
      </div>
    </div>
  );
}
