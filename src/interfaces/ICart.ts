import type { ICartItem } from "./ICartItem";

export type ICart = {
  id: string;
  cartItems: ICartItem[];
  total: number;
};
