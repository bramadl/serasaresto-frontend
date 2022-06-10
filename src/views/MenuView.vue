<script setup lang="ts">
import { useMenu } from "@/composables/useMenu";
import { usePriceFormatter } from "@/composables/usePriceFormatter";

import HomeLayout from "../layouts/HomeLayout.vue";
import SidebarMenu from "../components/home/SidebarMenu.vue";
import SearchMenuInput from "../components/home/SearchMenuInput.vue";
import FoodsIcon from "../components/icons/FoodsIcon.vue";
import DrinkIcon from "../components/icons/DrinkIcon.vue";
import MenuGroupLabel from "../components/home/MenuGroupLabel.vue";
import LoadMoreMenuButton from "../components/home/LoadMoreMenuButton.vue";
import MenuCard from "../components/home/MenuCard.vue";
import CartIcon from "../components/icons/CartIcon.vue";
import BaseFloatingButton from "../components/base/BaseFloatingButton.vue";

const {
  drinks,
  foods,
  drinksPagination,
  foodsPagination,
  search,
  setSearch,
  incrementPage,
} = useMenu();
const { formattedPrice } = usePriceFormatter();

const hasMoreFoods = foodsPagination.value.hasNextItems;
const hasMoreDrinks = drinksPagination.value.hasNextItems;
const hasCartItems = false;

const totalPrice = 80000;
const price = formattedPrice(totalPrice);
</script>

<template>
  <HomeLayout>
    <div class="relative flex-1 flex flex-col overflow-hidden">
      <SidebarMenu />

      <div class="flex-1 w-full h-full overflow-auto">
        <div class="m-10">
          <SearchMenuInput
            :value="search"
            @input="(value: string) => setSearch(value)"
          />
        </div>

        <section
          class="flex flex-col gap-10 m-10"
          :class="hasCartItems && 'mb-32'"
        >
          <div class="flex flex-col gap-8">
            <MenuGroupLabel label="Makanan" :icon="FoodsIcon" />
            <ul class="grid grid-cols-2 gap-8">
              <li v-for="food of foods" :key="food.id">
                <MenuCard v-bind="food" />
              </li>
            </ul>
            <LoadMoreMenuButton
              v-if="hasMoreFoods"
              @click="() => incrementPage('food')"
            />
          </div>

          <div class="flex flex-col gap-8">
            <MenuGroupLabel label="Minuman" :icon="DrinkIcon" />
            <ul class="grid grid-cols-2 gap-8">
              <li v-for="drink of drinks" :key="drink.id">
                <MenuCard v-bind="drink" />
              </li>
            </ul>
            <LoadMoreMenuButton
              v-if="hasMoreDrinks"
              @click="() => incrementPage('drink')"
            />
          </div>
        </section>
      </div>
    </div>
  </HomeLayout>

  <BaseFloatingButton v-if="hasCartItems">
    <CartIcon fill="white" />
    <span class="font-semibold text-white text-sm">
      Tambahkan Item - {{ price }}
    </span>
  </BaseFloatingButton>
</template>
