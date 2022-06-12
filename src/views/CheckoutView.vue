<script setup lang="ts">
import { onMounted } from "vue";

import HomeLayout from "../layouts/HomeLayout.vue";
import MenuGroupLabel from "../components/home/MenuGroupLabel.vue";
import CartIcon from "../components/icons/CartIcon.vue";
import PaymentIcon from "../components/icons/PaymentIcon.vue";
import BaseFloatingButton from "../components/base/BaseFloatingButton.vue";

import DotIcon from "../components/icons/DotIcon.vue";
import CheckoutItemList from "../components/checkout/CheckoutItemList.vue";
import { useCarts } from "@/composables/useCarts";

const { cart, fetchCart } = useCarts();
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
              <ul class="flex flex-col gap-6">
                <li v-for="(cartItem, index) in cart.cartItems" :key="index">
                  <CheckoutItemList :cart-item="cartItem" />
                </li>
              </ul>

              <div class="mt-10 flex items-center justify-between">
                <p class="font-semibold text-sm text-primary">Total</p>
                <p class="font-semibold text-sm text-primary">Rp 80.000</p>
              </div>
            </div>
          </div>

          <div
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

  <BaseFloatingButton>
    <PaymentIcon />
    <span class="font-semibold text-white text-sm"> Lanjutkan Pembayaran </span>
  </BaseFloatingButton>
</template>
