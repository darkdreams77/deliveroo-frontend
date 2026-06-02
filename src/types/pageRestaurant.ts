export type PageRestaurantType = {
  categories: CategoriesType;
  restaurant: RestaurantType;
};

export type MealType = {
  description: string;
  id: string;
  picture?: string;
  popular?: boolean;
  price: string;
  title: string;
  url?: string;
};

export type CategoryType = {
  name: string;
  meals: MealType[];
};

export type CategoriesType = CategoryType[];

export type RestaurantType = {
  address: string;
  categories: string[];
  client_address: AddressType;
  delay: string;
  description: string;
  name: string;
  path: string;
  percentage: number;
  phone: string;
  picture: string;
  price: string;
  ratings: string;
};

export type AddressType = {
  coordinates: number[];
  locality: string;
  country: string;
  formatted_address: string;
  post_code: string;
  city: string;
  route: string;
  street_number: string;
};

export type OrderType = {
  meal: MealType;
  quantity: number;
};

export type OrdersType = OrderType[];
