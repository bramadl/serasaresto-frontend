import type { AxiosInstance } from "axios";

export default ($axios: AxiosInstance) => ({
  getCarts() {
    return $axios.get("/carts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("table_token")}`,
      },
    });
  },
  addItemToCart(payload: { menu_id: string; cart_id: string; note?: string }) {
    return $axios.post(
      "/carts/items",
      {
        menu_id: payload.menu_id,
        note: payload.note,
        cart_id: payload.cart_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("table_token")}`,
        },
      }
    );
  },
  updateItemFromCart(
    menuId: string,
    payload: { note?: string; quantity: number }
  ) {
    return $axios.put(
      `/carts/items/${menuId}`,
      {
        quantity: payload.quantity,
        note: payload.note,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("table_token")}`,
        },
      }
    );
  },
  removeItemFromCart(menuId: string) {
    return $axios.delete(`/carts/items/${menuId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("table_token")}`,
      },
    });
  },
});
