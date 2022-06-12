import { $menuService } from "@/api";
import type { IApiError } from "@/interfaces/IApiError";
import type { IMenu } from "@/interfaces/IMenu";
import type { AxiosError } from "axios";
import { ref, watchEffect } from "vue";

interface IPagination {
  hasNextItems?: boolean;
  hasPreviousItems?: boolean;
  page?: number;
  perPage?: number;
  totalItems?: number;
  totalPages?: number;
}

const foods = ref<Array<IMenu>>([]);
const drinks = ref<Array<IMenu>>([]);

const foodsPagination = ref<IPagination>({});
const drinksPagination = ref<IPagination>({});

const search = ref<string>("");
const perPage = ref<string>("4");

const foodPage = ref<string>("1");
const drinkPage = ref<string>("1");

export function useMenu() {
  const setSearch = (value: string) => {
    search.value = value;
  };

  const incrementPage = (target: "food" | "drink") => {
    if (target === "food") {
      const prevPage = parseInt(foodPage.value, 10);
      foodPage.value = String(prevPage + 1);
    } else {
      const prevPage = parseInt(drinkPage.value, 10);
      drinkPage.value = String(prevPage + 1);
    }
  };

  watchEffect(async () => {
    try {
      const {
        data: {
          data: { menu: foodsMenu, pagination: foodsPaginationResponse },
        },
      } = await $menuService.getMenus(
        `search=${search.value}&per_page=${perPage.value}&page=${foodPage.value}`
      );

      const {
        data: {
          data: { menu: drinksMenu, pagination: drinksPaginationResponse },
        },
      } = await $menuService.getMenus(
        `search=${search.value}&per_page=${perPage.value}&page=${drinkPage.value}&type=minuman`
      );

      foods.value = foodsMenu;
      foodsPagination.value = foodsPaginationResponse;

      drinks.value = drinksMenu;
      drinksPagination.value = drinksPaginationResponse;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.data) {
          const { message } = error.response.data as IApiError;
          alert(message);
        } else {
          alert("Server sedang bermasalah. Silahkan coba beberapa saat lagi.");
        }
      } else {
        alert("Server sedang bermasalah. Silahkan coba beberapa saat lagi.");
      }
    }
  });

  return {
    foods,
    drinks,
    foodsPagination,
    drinksPagination,
    search,
    setSearch,
    perPage,
    foodPage,
    drinkPage,
    incrementPage,
  };
}
