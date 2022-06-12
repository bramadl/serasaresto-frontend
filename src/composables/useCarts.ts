import { $cartService } from "@/api";
import type { ICart } from "@/interfaces/ICart";
import type { IMenu } from "@/interfaces/IMenu";
import { reactive } from "vue";

const cart = reactive<ICart>({
  id: "",
  cartItems: [],
  total: 0,
});

export function useCarts() {
  async function fetchCart() {
    const response = await $cartService.getCarts();
    const { data } = response.data;

    cart.id = data.id;
    cart.cartItems = data.cartItems;
    cart.total = data.total;
  }

  const addItem = async (menu: IMenu) => {
    const response = await $cartService.addItemToCart({
      menu_id: menu.id,
      cart_id: cart.id,
      note: "", // since adding and making notes are in the different cycle.
    });

    if (response.status) await fetchCart();
  };

  return {
    cart,
    fetchCart,
    addItem,
  };
}
