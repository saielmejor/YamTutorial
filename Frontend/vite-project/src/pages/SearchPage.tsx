import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

export default function SearchPage() {
  const { city } = useParams();
  const { results } = useSearchRestaurants(city);

  return (
    <span>
      {" "}
      User searched for {city}
      {results?.data.map((restaurant) => (
        <span> found- {restaurant.restaurantName},{restaurant.city} </span>
      ))}
    </span>
  );
}
