import { FaStar } from "react-icons/fa";
import type { MealType } from "../types/pageRestaurant";
import placeholder from "../assets/img/deliveroo.jpg";

type MealProps = {
  meal: MealType;
  onClick: () => void;
};

export const Meal = ({ meal, onClick }: MealProps) => {
  return (
    <li
      className="bg-white dark:bg-zinc-950 p-4 card-interactive cursor-pointer rounded-sm grow flex-[100%] md:flex-[calc(50%-10px)] lg:flex-[100%] lg:w-full lg:grow xl:flex-[calc(50%-10px)] md:grow-0 xl:grow-0 flex gap-2 justify-between h-40 content-start"
      onClick={onClick}
    >
      <div>
        <h3 className="mb-2">{meal.title}</h3>
        {meal.description && (
          <p
            className="text-gray-500 text-sm mb-2 overflow-hidden text-ellipsis h-10"
            title={meal.description}
          >
            {meal.description}
          </p>
        )}
        <p className="flex items-center gap-6">
          <span className="text-gray-500 ">{meal.price} €</span>{" "}
          {meal.popular && (
            <span className="text-coral font-bold text-sm">
              <FaStar className="inline" /> Populaire
            </span>
          )}
        </p>
      </div>
      <img
        src={meal.picture ?? placeholder}
        alt={meal.description}
        className="rounded-sm size-32.5 object-cover"
      />
    </li>
  );
};
