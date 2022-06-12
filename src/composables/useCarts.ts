import { $cartService } from "@/api";
import { alertErrorResponse } from "@/helpers/AlertErrorResponse";
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
    const cartItemMenu = cart.cartItems.find(
      (cartItem) => cartItem.menu.id === menu.id
    );
    cartItemMenu && cartItemMenu.quantity++;

    try {
      const response = await $cartService.addItemToCart({
        menu_id: menu.id,
        cart_id: cart.id,
        note: "", // since adding and making notes are in the different cycle.
      });
      if (response.status) await fetchCart();
    } catch (err) {
      alertErrorResponse(err);
      cartItemMenu && cartItemMenu.quantity++;
    }
  };

  const removeItem = async (menu: IMenu) => {
    const cartItemMenu = cart.cartItems.find(
      (cartItem) => cartItem.menu.id === menu.id
    );
    cartItemMenu && cartItemMenu.quantity--;

    try {
      const response = await $cartService.removeItemFromCart(menu.id);
      if (response.status) await fetchCart();
    } catch (err) {
      alertErrorResponse(err);
      cartItemMenu && cartItemMenu.quantity++;
    }
  };

  return {
    cart,
    fetchCart,
    addItem,
    removeItem,
  };
}
