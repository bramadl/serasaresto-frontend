<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

import { $orderService } from "@/api";
import { parseOrderNumber } from "@/helpers/ParseOrderNumber";
import { usePriceFormatter } from "@/composables/usePriceFormatter";
import { alertErrorResponse } from "@/helpers/AlertErrorResponse";
import type { IOrder } from "@/interfaces/IOrder";

import HomeLayout from "../layouts/HomeLayout.vue";

import SidebarMenu from "../components/home/SidebarMenu.vue";
import MenuGroupLabel from "../components/home/MenuGroupLabel.vue";
import ClockIcon from "../components/icons/ClockIcon.vue";
// import SearchMenuInput from "../components/home/SearchMenuInput.vue";
import BaseStatusBadge from "../components/base/BaseStatusBadge.vue";
import CheckoutItemList from "../components/checkout/CheckoutItemList.vue";

const { formattedPrice } = usePriceFormatter();

const orders = ref<IOrder[]>([]);
const isLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    const response = await $orderService.getOrderHistories();
    const { data } = response.data;
    orders.value = data;
  } catch (err) {
    alertErrorResponse(err);
  } finally {
    isLoading.value = false;
  }
});

const parseDate = (date: Date) => {
  const base = new Date(date);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const parsed = {
    year: String(base.getFullYear()),
    month: months[base.getMonth()],
    date: base.getDate() < 10 ? `0${base.getDate()}` : `${base.getDate()}`,
    hour: base.getHours() < 10 ? `0${base.getHours()}` : `${base.getHours()}`,
    minute:
      base.getMinutes() < 10 ? `0${base.getMinutes()}` : `${base.getMinutes()}`,
  };

  return `${parsed.date} ${parsed.month} ${parsed.year}, ${parsed.hour}:${parsed.minute} WIB`;
};
</script>

<template>
  <HomeLayout>
    <div class="relative flex-1 flex flex-col overflow-hidden">
      <SidebarMenu />

      <div class="flex-1 w-full h-full overflow-auto">
        <!-- <div class="m-10">
          <SearchMenuInput />
        </div> -->

        <section class="flex flex-col gap-10 m-10">
          <div class="flex flex-col gap-8">
            <MenuGroupLabel label="Histori Order" :icon="ClockIcon" />

            <div
              v-for="order in orders"
              :key="order.id"
              class="bg-white rounded-lg p-6 border border-transparent hover:border-green transition ease-out duration-300"
              style="box-shadow: 2px 0px 16px 0px #012f2d0a"
            >
              <RouterLink
                class="block"
                :to="{ name: 'status', params: { id: order.id } }"
              >
                <div class="flex flex-col gap-6">
                  <div class="w-full flex items-center justify-between">
                    <div>
                      <p class="font-bold text-primary">
                        Order {{ parseOrderNumber(order.number) }}
                      </p>
                      <p class="font-light text-sm text-secondary">
                        {{ parseDate(order.created_at as Date) }}
                      </p>
                    </div>
                    <BaseStatusBadge :success="order.status === 'DONE'" />
                  </div>

                  <ul class="flex flex-col gap-8">
                    <li
                      v-for="orderDetail in order.details"
                      :key="orderDetail.menu.id"
                    >
                      <CheckoutItemList :cart-item="orderDetail" type="order" />
                    </li>
                  </ul>

                  <div class="flex items-center justify-between">
                    <p class="font-semibold text-sm text-primary">Total</p>
                    <p class="font-semibold text-sm text-primary">
                      {{ formattedPrice(order.total) }}
                    </p>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  </HomeLayout>
</template>
