export type IMenu = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  inStock: boolean;
  type: "makanan" | "minuman";
};
