import { reactive } from "vue";
import { $cartService } from "@/api";
import { alertErrorResponse } from "@/helpers/AlertErrorResponse";
import type { ICart } from "@/interfaces/ICart";
import type { IMenu } from "@/interfaces/IMenu";

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

  const onAddItem = (menu: IMenu) => {
    const menuFromCart = cart.cartItems.find((m) => {
      return m.menu.id === menu.id;
    });

    if (menuFromCart) {
      updateItem(menu, {
        quantity: menuFromCart.quantity + 1,
        note: menuFromCart.note,
      });
    } else {
      addItem(menu);
    }
  };

  const onRemoveItem = (menu: IMenu) => {
    const menuFromCart = cart.cartItems.find((m) => {
      return m.menu.id === menu.id;
    });

    if (menuFromCart) {
      if (menuFromCart.quantity !== 1) {
        updateItem(menu, {
          quantity: menuFromCart.quantity - 1,
          note: menuFromCart.note,
        });
      } else {
        removeItem(menu);
      }
    }
  };

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
      if (response.status === 201) await fetchCart();
    } catch (err) {
      alertErrorResponse(err);
      cartItemMenu && cartItemMenu.quantity++;
    }
  };

  const updateItem = async (
    menu: IMenu,
    { quantity, note }: { quantity: number; note: string }
  ) => {
    const cartItemMenu = cart.cartItems.find(
      (cartItem) => cartItem.menu.id === menu.id
    );
    if (!cartItemMenu) return;
    const tempNote = cartItemMenu.note;
    cartItemMenu.quantity = quantity;
    cartItemMenu.note = note;

    try {
      const response = await $cartService.updateItemFromCart(menu.id, {
        quantity,
        note,
      });

      if (response.status === 200) await fetchCart();
    } catch (err) {
      alertErrorResponse(err);
      cartItemMenu.quantity = quantity - 1;
      cartItemMenu.note = tempNote;
    }
  };

  const removeItem = async (menu: IMenu) => {
    const cartItemMenu = cart.cartItems.find(
      (cartItem) => cartItem.menu.id === menu.id
    );
    cartItemMenu && cartItemMenu.quantity--;

    try {
      const response = await $cartService.removeItemFromCart(menu.id);
      if (response.status === 204) await fetchCart();
    } catch (err) {
      alertErrorResponse(err);
      cartItemMenu && cartItemMenu.quantity++;
    }
  };

  return {
    cart,
    fetchCart,
    addItem,
    updateItem,
    removeItem,
    onAddItem,
    onRemoveItem,
  };
}
