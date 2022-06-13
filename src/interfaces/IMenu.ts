export type IMenu = {
  id: string;
  thumbnail: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  type: "makanan" | "minuman";
};
