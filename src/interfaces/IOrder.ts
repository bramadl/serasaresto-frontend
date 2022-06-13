export interface IOrder {
  id: string;
  status: string;
  details: {
    menu: {
      id: string;
      name: string;
      price: number;
      thumbnail: string;
    };
    quantity: number;
    note: string;
  }[];
  total: number;
  number: number;
  created_at?: Date;
}
