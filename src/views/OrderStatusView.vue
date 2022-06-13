<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

import { $orderService } from "@/api";
import { usePriceFormatter } from "@/composables/usePriceFormatter";
import { parseOrderNumber } from "@/helpers/ParseOrderNumber";
import type { IOrder } from "@/interfaces/IOrder";

import HomeLayout from "../layouts/HomeLayout.vue";

import SidebarMenu from "../components/home/SidebarMenu.vue";
import FoodsIcon from "../components/icons/FoodsIcon.vue";
import MenuGroupLabel from "../components/home/MenuGroupLabel.vue";
import CheckoutItemList from "../components/checkout/CheckoutItemList.vue";
import BaseStatusBadge from "../components/base/BaseStatusBadge.vue";
import ConfirmOrderModal from "../components/checkout/ConfirmOrderModal.vue";
import { alertErrorResponse } from "@/helpers/AlertErrorResponse";

const route = useRoute();
const router = useRouter();
const { formattedPrice } = usePriceFormatter();

const order = ref<IOrder>({
  id: "",
  details: [],
  number: 0,
  status: "",
  total: 0,
});
const isLoading = ref<boolean>(true);
const isOpen = ref<boolean>(false);

const total = computed<number>(() => {
  return order.value.total;
});

const pph = computed<number>(() => {
  return (total.value * 11) / 100;
});

const orderId = computed(() => {
  return route.params.id as string;
});

onMounted(async () => {
  try {
    const response = await $orderService.viewOrder(orderId.value);
    const { data } = response.data;
    order.value = data;
  } catch (err) {
    router.replace({ name: "menu" });
  } finally {
    isLoading.value = false;
  }
});

const onConfirm = async () => {
  try {
    await $orderService.confirmOrder(orderId.value);
    order.value.status = "DONE";
  } catch (err) {
    alertErrorResponse(err);
  } finally {
    isOpen.value = false;
  }
};
</script>

<template>
  <HomeLayout>
    <div class="relative flex-1 flex flex-col overflow-hidden">
      <SidebarMenu />

      <div v-if="!isLoading" class="flex-1 w-full h-full overflow-auto">
        <section class="flex flex-col gap-10 m-10 mb-32">
          <div class="flex flex-col gap-8">
            <MenuGroupLabel label="Status Pesanan" :icon="FoodsIcon" />

            <div class="flex items-center justify-between">
              <p class="font-bold text-secondary text-sm">
                Nomor Order :
                <span class="text-primary">
                  {{ parseOrderNumber(order.number) }}
                </span>
              </p>

              <BaseStatusBadge :success="order.status === 'DONE'" />
            </div>

            <div
              class="bg-white rounded-lg p-6"
              style="box-shadow: 2px 0px 16px 0px #012f2d0a"
            >
              <ul class="flex flex-col gap-8">
                <li
                  v-for="orderDetail in order.details"
                  :key="orderDetail.menu.id"
                >
                  <CheckoutItemList :cart-item="orderDetail" type="order" />
                </li>
              </ul>

              <div class="flex flex-col gap-4 mt-10">
                <div class="flex items-center justify-between">
                  <p class="text-sm text-secondary">Subtotal</p>
                  <p class="text-sm text-secondary">
                    {{ formattedPrice(total) }}
                  </p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm text-secondary">Pajak (11%)</p>
                  <p class="text-sm text-secondary">
                    {{ formattedPrice(pph) }}
                  </p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm text-secondary">Diskon (Rp)</p>
                  <p class="text-sm text-secondary">Rp 0</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="font-medium text-lg text-primary">Total</p>
                  <p class="font-medium text-lg text-primary">
                    {{ formattedPrice(total + pph) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ConfirmOrderModal
          :is-open="isOpen"
          @close="isOpen = false"
          @confirm="onConfirm"
        />
      </div>
    </div>
  </HomeLayout>

  <div
    class="absolute left-1/2 -translate-x-1/2 bottom-10 w-full flex items-center justify-between gap-4 px-10"
  >
    <RouterLink
      to="/"
      class="flex-1 text-center py-3 px-4 rounded-lg bg-transparent text-green border-2 border-green"
    >
      Kembali Ke Menu
    </RouterLink>
    <button
      class="flex-1 text-center py-3 px-4 rounded-lg bg-green disabled:bg-[#EAEAEA] disabled:border-[#DBDBDB] disabled:text-placeholder text-white border-2 border-green"
      :disabled="order.status === 'DONE'"
      @click="isOpen = true"
    >
      Konfirmasi Pesanan
    </button>
  </div>
</template>
