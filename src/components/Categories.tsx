import { useEffect, useState } from "react";
import type {
  CategoriesType,
  MealType,
  OrdersType,
} from "../types/pageRestaurant";
import { Basket } from "./Basket";
import { Container } from "./Layout";
import { Meal } from "./Meal";

type CategoriesProps = {
  categories: CategoriesType;
};

export const Categories = ({ categories }: CategoriesProps) => {
  const [orders, setOrders] = useState<OrdersType>([]);

  useEffect(() => {
    console.log("orders", orders);
  }, [orders]);

  const addToBasket = (meal: MealType) => {
    const alreadyInBasket = orders.findIndex(
      (order) => order.meal.id === meal.id,
    );

    if (alreadyInBasket === -1) {
      setOrders((prevOrders) => [...prevOrders, { meal, quantity: 1 }]);
    } else {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.meal.id === meal.id
            ? { ...order, quantity: order.quantity + 1 }
            : order,
        ),
      );
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-900 ">
      <Container className="py-6 flex justify-between gap-5 flex-col lg:flex-row">
        <section className="w-full lg:w-[calc(100%-350px)] ">
          {categories
            .filter((item) => item.meals.length > 0)
            .map((category, index) => (
              <article key={`${category.name}-${index}`} className="flex-1">
                <h2 className="text-2xl font-bold mb-3">{category.name}</h2>
                <ul className="flex flex-wrap gap-5 mb-8 justify-between items-start">
                  {category.meals.map((meal) => (
                    <Meal
                      meal={meal}
                      key={meal.id}
                      onClick={() => addToBasket(meal)}
                    />
                  ))}
                </ul>
              </article>
            ))}
        </section>
        <Basket orders={orders} setOrders={setOrders} />
      </Container>
    </div>
  );
};
