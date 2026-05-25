export type Coffee = {
  id: number;
  uid?: string;
  title: string;
  description: string;
  ingredients: string[];
  image: string;
  price: number;
  quantity?: number;
};

export type CoffeeCategory = "hot" | "iced";
