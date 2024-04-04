export interface IProduct {
  id: string | number;
  name: string;
  description: string;
  slug: string;
  overview: string;
  price: number;
  category: "SANDWICH" | "SIDE" | "DESSERT" | "DRINK";
}
