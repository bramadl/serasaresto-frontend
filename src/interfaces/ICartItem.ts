import type { IMenu } from "./IMenu";

export type ICartItem = {
  quantity: number;
  note: string;
  menu: IMenu;
};
