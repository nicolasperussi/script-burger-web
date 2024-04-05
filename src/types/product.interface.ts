export interface IProduct {
  id: number;
  name: string;
  description: string;
  slug: string;
  overview: string;
  price: number;
  category: "SANDWICH" | "SIDE" | "DESSERT" | "DRINK";
}
