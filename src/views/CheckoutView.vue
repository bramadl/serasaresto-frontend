<script setup lang="ts">
import { onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";

import { $orderService } from "@/api";
import { useCarts } from "@/composables/useCarts";
import { usePriceFormatter } from "@/composables/usePriceFormatter";
import { alertErrorResponse } from "@/helpers/AlertErrorResponse";

import HomeLayout from "../layouts/HomeLayout.vue";

import BaseFloatingButton from "../components/base/BaseFloatingButton.vue";
import CheckoutItemList from "../components/checkout/CheckoutItemList.vue";
import MenuGroupLabel from "../components/home/MenuGroupLabel.vue";
import CartIcon from "../components/icons/CartIcon.vue";
import PaymentIcon from "../components/icons/PaymentIcon.vue";
import DotIcon from "../components/icons/DotIcon.vue";

const { cart, fetchCart } = useCarts();
const { formattedPrice } = usePriceFormatter();
const router = useRouter();

const onMakeOrder = async () => {
  try {
    const response = await $orderService.makeOrder();
    const orderId = response.data.message;
    router.replace({ name: "status", params: { id: orderId } });
  } catch (err) {
    alertErrorResponse(err);
  }
};

onMounted(fetchCart);
</script>

<template>
  <HomeLayout no-hamburger>
    <div class="relative flex-1 flex flex-col overflow-hidden">
      <div class="flex-1 w-full h-full overflow-auto">
        <section class="flex flex-col gap-10 m-10 mb-32">
          <div class="flex flex-col gap-8">
            <MenuGroupLabel label="Checkout" :icon="CartIcon" />

            <div
              class="bg-white rounded-lg p-6"
              style="box-shadow: 2px 0px 16px 0px #012f2d0a"
            >
              <template v-if="cart.cartItems.length">
                <ul class="flex flex-col gap-6">
                  <li
                    v-for="cartItem in cart.cartItems"
                    :key="cartItem.menu.id"
                  >
                    <CheckoutItemList :cart-item="cartItem" />
                  </li>
                </ul>

                <div class="mt-10 flex items-center justify-between">
                  <p class="font-semibold text-sm text-primary">Total</p>
                  <p class="font-semibold text-sm text-primary">
                    {{ formattedPrice(cart.total) }}
                  </p>
                </div>
              </template>

              <div v-else>
                <p class="text-center text-primary">
                  Anda tidak memiliki menu di keranjang
                </p>
              </div>
            </div>
          </div>

          <div
            v-if="cart.cartItems.length"
            class="bg-white rounded-lg p-6"
            style="box-shadow: 2px 0px 16px 0px #012f2d0a"
          >
            <p class="font-semibold text-primary text-sm mb-4">Pembayaran</p>
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <DotIcon />
                <p class="font-semibold text-primary">Tunai</p>
              </div>
              <PaymentIcon fill="#717A7A" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </HomeLayout>

  <template v-if="cart.cartItems.length">
    <BaseFloatingButton @click="onMakeOrder">
      <PaymentIcon />
      <span class="font-semibold text-white text-sm">
        Lanjutkan Pembayaran
      </span>
    </BaseFloatingButton>
  </template>
  <template v-else>
    <RouterLink :to="{ name: 'menu' }">
      <BaseFloatingButton>
        <span class="font-semibold text-white text-sm">Kembali ke menu</span>
      </BaseFloatingButton>
    </RouterLink>
  </template>
</template>
