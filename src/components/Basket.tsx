import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import type { OrdersType, OrderType } from "../types/pageRestaurant";
import { formatEuro } from "../helpers/formatCurrency";
import { useEffect, useRef, useState } from "react";

type BasketProps = {
  orders: OrdersType;
  setOrders: React.Dispatch<React.SetStateAction<OrdersType>>;
};

const FEES: number = 2.5;

export const Basket = ({ orders, setOrders }: BasketProps) => {
  const [total, setTotal] = useState(0);
  const [basketVisible, setBasketVisible] = useState(false);
  const basketRef = useRef<HTMLElement | null>(null);

  const subtotal = orders.reduce(
    (sum, order) => sum + Number(order.meal.price) * order.quantity,
    0,
  );

  const totalItems = orders.reduce((sum, order) => sum + order.quantity, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setBasketVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    if (basketRef.current) observer.observe(basketRef.current);

    return () => observer.disconnect();
  }, []);

  const goToBasket = () => {
    document.getElementById("basket")?.scrollIntoView({ behavior: "smooth" });
  };

  const removeOne = (order: OrderType) => {
    setOrders((prevOrders) =>
      prevOrders
        .map((prevOrder) =>
          prevOrder.meal.id === order.meal.id
            ? { ...prevOrder, quantity: prevOrder.quantity - 1 }
            : prevOrder,
        )
        .filter((order) => order.quantity > 0),
    );
  };

  const addOne = (order: OrderType) => {
    setOrders((prevOrders) =>
      prevOrders.map((prevOrder) =>
        prevOrder.meal.id === order.meal.id
          ? { ...prevOrder, quantity: prevOrder.quantity + 1 }
          : prevOrder,
      ),
    );
  };

  useEffect(() => {
    setTotal(subtotal + FEES);
  }, [subtotal]);

  return (
    <>
      <aside
        className={`lg:hidden sticky bottom-0 p-4 dark:bg-zinc-950 w-full left-0 z-10 rounded-sm ${
          basketVisible ? "hidden" : "block"
        }`}
        id="basket-mobile"
      >
        <button
          onClick={goToBasket}
          className="bg-teal-500 rounded-sm w-full p-4 font-bold text-white disabled:bg-gray-400 disabled:text-gray-500 cursor-pointer disabled:cursor-default"
          disabled={orders.length === 0}
        >
          Voir le panier {totalItems > 0 && <>({totalItems})</>}
        </button>
      </aside>
      <aside
        ref={basketRef}
        className="w-full lg:w-87.5 bg-white dark:bg-zinc-950 p-4 self-start rounded-sm shadow-2xl sticky top-5"
        id="basket"
      >
        <button
          className="bg-teal-500 rounded-sm w-full p-4 font-bold text-white disabled:bg-gray-400 disabled:text-gray-500 cursor-pointer disabled:cursor-default"
          disabled={orders.length === 0}
        >
          Valider le panier
        </button>
        <>
          {orders.length === 0 && (
            <div className="text-center pb-8 pt-10">Votre panier est vide</div>
          )}
          {orders.length > 0 && (
            <>
              <ul className="my-4 border-b border-b-gray-200 pb-2">
                {orders.map((order) => (
                  <li className="mb-3 flex gap-2 items-start justify-between w-full">
                    <div className="flex gap-1 items-center text-zinc-600 dark:text-zinc-500 ">
                      <button
                        onClick={() => removeOne(order)}
                        className="text-teal-500"
                      >
                        <FaMinusCircle />
                      </button>
                      {order.quantity}
                      <button
                        onClick={() => addOne(order)}
                        className="text-teal-500"
                      >
                        <FaPlusCircle />
                      </button>
                    </div>
                    <div className="flex-1">{order.meal.title}</div>
                    <div className="">
                      {formatEuro(Number(order.meal.price) * order.quantity)}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{formatEuro(subtotal)}</span>
              </div>
              {orders.length > 0 && (
                <div className="flex justify-between border-b border-b-gray-200 pb-4">
                  <span>Frais de livraison</span>
                  <span>{formatEuro(FEES)}</span>
                </div>
              )}
              <div className="flex justify-between mt-3 font-bold">
                <span>Total</span>
                <span>{formatEuro(total)}</span>
              </div>
            </>
          )}
        </>
      </aside>
    </>
  );
};
