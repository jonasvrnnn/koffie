import { Coffee } from "../types";

const HOT_URL = "https://sampleapis.assimilate.be/coffee/hot";
const ICED_URL = "https://sampleapis.assimilate.be/coffee/iced";

export async function getHotCoffee(): Promise<Coffee[]> {
  const res = await fetch(HOT_URL);
  return res.json();
}

export async function getIcedCoffee(): Promise<Coffee[]> {
  const res = await fetch(ICED_URL);
  return res.json();
}

function generatePrice(id: number): number {
  const base = 2.5;

  const price = base + (id % 6) * 0.6 + (id % 3) * 0.4;

  return Math.round(price * 100) / 100;
}

function translateDescription(title: string): string {
  switch (title.toLowerCase()) {
    case "black coffee":
      return "Simple black coffee served hot.";

    case "latte":
      return "Smooth espresso mixed with steamed milk.";

    case "espresso":
      return "Strong and concentrated coffee shot.";

    case "cappuccino":
      return "Espresso topped with creamy milk foam.";

    case "americano":
      return "Espresso diluted with hot water.";

    case "mocha":
      return "Coffee blended with chocolate and milk.";

    case "flat white":
      return "Rich espresso with silky steamed milk.";

    case "macchiato":
      return "Espresso with a small amount of milk foam.";

    case "iced espresso":
      return "Cold espresso served over ice.";

    case "cold brew":
      return "Slow brewed cold coffee with a smooth taste.";

    case "iced latte":
      return "Refreshing latte served with ice.";

    case "frappe":
      return "Blended iced coffee drink.";

    default:
      return "Delicious coffee specialty.";
  }
}

function translateIngredients(ingredients: string[]): string[] {
  const map: Record<string, string> = {
    Coffee: "Coffee",
    Espresso: "Espresso",
    "Ångad mjölk": "Steamed Milk",
    Ice: "Ice",
    Sugar: "Sugar",
    "Sugar*": "Sugar",
    "Cream*": "Cream",
    "Long steeped coffee": "Cold Brew Coffee",
  };

  return ingredients.map((item) => map[item] || item);
}

export async function getAllCoffee(): Promise<Coffee[]> {
  const [hot, iced] = await Promise.all([getHotCoffee(), getIcedCoffee()]);

  const hotMapped = hot.map((item) => ({
    ...item,
    uid: `hot-${item.id}`,
    price: generatePrice(item.id),
    description: translateDescription(item.title),
    ingredients: translateIngredients(item.ingredients),
  }));

  const icedMapped = iced.map((item) => ({
    ...item,
    uid: `iced-${item.id + 100}`,
    price: generatePrice(item.id + 100),
    description: translateDescription(item.title),
    ingredients: translateIngredients(item.ingredients),
  }));

  return [...hotMapped, ...icedMapped];
}

export function getCoffeeById(all: Coffee[], id: number): Coffee | undefined {
  return all.find((c) => c.id === id);
}
