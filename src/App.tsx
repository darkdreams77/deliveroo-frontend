import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { getPageRestaurant } from "./services/getRestaurant";
import useAsyncEffect from "./hooks/useAsyncEffect";
import type { PageRestaurantType } from "./types/pageRestaurant";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";

function App() {
  const [pageRestaurant, setPageRestaurant] =
    useState<PageRestaurantType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useAsyncEffect(async () => {
    setIsLoading(true);
    const result: PageRestaurantType = await getPageRestaurant();
    console.log("result", result);
    setPageRestaurant(result);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("restaurant", pageRestaurant);
  }, [pageRestaurant]);

  return (
    <>
      <Header />
      <main>
        {isLoading || !pageRestaurant ? (
          <>En cours de chargement</>
        ) : (
          <>
            <Hero restaurant={pageRestaurant.restaurant} />
            <Categories categories={pageRestaurant.categories} />
          </>
        )}
      </main>
    </>
  );
}

export default App;
