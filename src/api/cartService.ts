import type { AxiosInstance } from "axios";

export default ($axios: AxiosInstance) => ({
  getCarts() {
    return $axios.get("/carts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("table_token")}`,
      },
    });
  },
  addItemToCart({
    menu_id,
    note,
    cart_id,
  }: {
    menu_id: string;
    note: string;
    cart_id: string;
  }) {
    return $axios.post(
      "/carts/items",
      {
        menu_id,
        note,
        cart_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("table_token")}`,
        },
      }
    );
  },
});
