<script setup lang="ts">
import { RouterLink } from "vue-router";

import HomeLayout from "../layouts/HomeLayout.vue";
import SidebarMenu from "../components/home/SidebarMenu.vue";
import FoodsIcon from "../components/icons/FoodsIcon.vue";
import MenuGroupLabel from "../components/home/MenuGroupLabel.vue";
import CheckoutItemList from "../components/checkout/CheckoutItemList.vue";
import BaseStatusBadge from "../components/base/BaseStatusBadge.vue";
</script>

<template>
  <HomeLayout>
    <div class="relative flex-1 flex flex-col overflow-hidden">
      <SidebarMenu />

      <div class="flex-1 w-full h-full overflow-auto">
        <section class="flex flex-col gap-10 m-10 mb-32">
          <div class="flex flex-col gap-8">
            <MenuGroupLabel label="Status Pesanan" :icon="FoodsIcon" />

            <div class="flex items-center justify-between">
              <p class="font-bold text-secondary text-sm">
                Nomor Order :
                <span class="text-primary"> #021 </span>
              </p>

              <BaseStatusBadge />
            </div>

            <div
              class="bg-white rounded-lg p-6"
              style="box-shadow: 2px 0px 16px 0px #012f2d0a"
            >
              <ul class="flex flex-col gap-8">
                <li v-for="item in 2" :key="item">
                  <CheckoutItemList>
                    <template #description>
                      <span class="font-light text-xs text-secondary">
                        Catatan: Tidak terlalu pedas
                      </span>
                    </template>

                    <template #amount>
                      <span class="font-semibold text-sm text-primary">
                        2X
                      </span>
                      <p class="font-semibold text-sm text-primary">
                        Rp 40.000
                      </p>
                    </template>
                  </CheckoutItemList>
                </li>
              </ul>

              <div class="flex flex-col gap-4 mt-10">
                <div class="flex items-center justify-between">
                  <p class="text-sm text-secondary">Subtotal</p>
                  <p class="text-sm text-secondary">Rp 40.000</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm text-secondary">Pajak (%)</p>
                  <p class="text-sm text-secondary">Rp 4.000</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="text-sm text-secondary">Diskon (Rp)</p>
                  <p class="text-sm text-secondary">Rp 0</p>
                </div>
                <div class="flex items-center justify-between">
                  <p class="font-medium text-lg text-primary">Total</p>
                  <p class="font-medium text-lg text-primary">Rp 44.000</p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
      class="flex-1 text-center py-3 px-4 rounded-lg bg-green text-white border-2 border-green"
    >
      Konfirmasi Pesanan
    </button>
  </div>
</template>
