import type { AxiosInstance } from "axios";

interface BaseItemPayload {
  note?: string;
}

interface UpdateItemPayload extends BaseItemPayload {
  quantity: number;
}

interface AddItemPayload extends BaseItemPayload {
  menu_id: string;
  cart_id: string;
}

export default ($axios: AxiosInstance) => ({
  getCarts() {
    return $axios.get("/carts", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("table_token")}`,
      },
    });
  },
  addItemToCart({ menu_id, note, cart_id }: AddItemPayload) {
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
  updateItemFromCart(menuId: string, payload: UpdateItemPayload) {
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
