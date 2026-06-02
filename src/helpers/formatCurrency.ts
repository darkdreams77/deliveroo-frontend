export const formatEuro = (price: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
    price,
  );
