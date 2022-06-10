<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";

import { useSidebar } from "@/composables/useSidebar";
import OrderIcon from "../icons/OrderIcon.vue";
import LogoutIcon from "../icons/LogoutIcon.vue";
import MenuIcon from "../icons/MenuIcon.vue";
import { $customerService } from "@/api";
import type { AxiosError } from "axios";
import type { IApiError } from "@/interfaces/IApiError";

const router = useRouter();
const { isSidebarOpened, setIsSidebarOpened } = useSidebar();

const logout = async () => {
  const token = localStorage.getItem("table_token") as string;
  try {
    await $customerService.logout(token);
    localStorage.removeItem("customer_name");
    localStorage.removeItem("table_name");
    localStorage.removeItem("table_token");
    router.replace({ name: "login", force: true });
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
};
</script>

<template>
  <aside
    class="absolute z-10 left-0 top-0 w-full h-full bg-black/25 transition-all ease-out duration-300"
    :class="
      isSidebarOpened
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none'
    "
    @click.self="setIsSidebarOpened"
  >
    <nav
      class="absolute top-0 w-60 h-full py-6 bg-green transition-all ease-out duration-300"
      :class="isSidebarOpened ? 'left-0' : '-left-full'"
    >
      <ul class="w-full h-full flex flex-col items-end justify-between">
        <li class="flex flex-col gap-4">
          <RouterLink
            class="flex items-center gap-2 rounded-l-full text-white px-10 py-2.5"
            :class="$route.name === 'menu' && 'bg-highlight'"
            to="/"
          >
            <MenuIcon />
            <span>Menu</span>
          </RouterLink>
          <RouterLink
            class="flex items-center gap-2 rounded-l-full text-white px-10 py-2.5"
            :class="$route.name === 'history' && 'bg-highlight'"
            to="/history"
          >
            <OrderIcon />
            <span>Order</span>
          </RouterLink>
        </li>
        <li>
          <button
            class="flex items-center gap-2 text-white px-6 py-2.5"
            @click="logout"
          >
            <span>Logout</span>
            <LogoutIcon />
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>
