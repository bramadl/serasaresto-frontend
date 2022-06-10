<script setup lang="ts">
import HomeLayout from "../layouts/HomeLayout.vue";
import SidebarMenu from "../components/home/SidebarMenu.vue";
import MenuGroupLabel from "../components/home/MenuGroupLabel.vue";
import ClockIcon from "../components/icons/ClockIcon.vue";
import SearchMenuInput from "../components/home/SearchMenuInput.vue";
import BaseStatusBadge from "../components/base/BaseStatusBadge.vue";
import CheckoutItemList from "../components/checkout/CheckoutItemList.vue";
</script>

<template>
  <HomeLayout>
    <div class="relative flex-1 flex flex-col overflow-hidden">
      <SidebarMenu />

      <div class="flex-1 w-full h-full overflow-auto">
        <div class="m-10">
          <SearchMenuInput />
        </div>

        <section class="flex flex-col gap-10 m-10">
          <div class="flex flex-col gap-8">
            <MenuGroupLabel label="Histori Order" :icon="ClockIcon" />

            <div
              class="bg-white rounded-lg p-6"
              style="box-shadow: 2px 0px 16px 0px #012f2d0a"
            >
              <div class="flex flex-col gap-6">
                <div class="w-full flex items-center justify-between">
                  <div>
                    <p class="font-bold text-primary">Order #021</p>
                    <p class="mt-2 text-secondary">23 Juni 2022, 20:30 WIB</p>
                  </div>
                  <BaseStatusBadge />
                </div>

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

                <div class="flex items-center justify-between">
                  <p class="font-semibold text-sm text-primary">Total</p>
                  <p class="font-semibold text-sm text-primary">Rp 80.000</p>
                </div>
              </div>
            </div>

            <div
              class="bg-white rounded-lg p-6"
              style="box-shadow: 2px 0px 16px 0px #012f2d0a"
            >
              <div class="flex flex-col gap-6">
                <div class="w-full flex items-center justify-between">
                  <div>
                    <p class="font-bold text-primary">Order #021</p>
                    <p class="mt-2 text-secondary">23 Juni 2022, 20:30 WIB</p>
                  </div>
                  <BaseStatusBadge success />
                </div>

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

                <div class="flex items-center justify-between">
                  <p class="font-semibold text-sm text-primary">Total</p>
                  <p class="font-semibold text-sm text-primary">Rp 80.000</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </HomeLayout>
</template>
