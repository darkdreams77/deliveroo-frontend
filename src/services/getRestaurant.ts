import axios from "axios";

const URL = import.meta.env.VITE_BFF_URI;

export const getPageRestaurant = async () => {
  const result = await axios.get(URL);
  return result.data || [];
};
