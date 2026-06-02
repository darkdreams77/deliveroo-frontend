import type { RestaurantType } from "../types/pageRestaurant";
import { Container } from "./Layout";

type HeroProps = {
  restaurant: RestaurantType;
};

export const Hero = ({ restaurant }: HeroProps) => {
  return (
    <Container className="flex flex-col-reverse lg:flex-row gap-8 items-center py-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
        <p className="text-gray-500">{restaurant.description}</p>
      </div>
      <img src={restaurant.picture} className="w-full lg:w-87.5 rounded-sm" />
    </Container>
  );
};
