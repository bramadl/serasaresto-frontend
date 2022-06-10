<script setup lang="ts">
import { useSidebar } from "@/composables/useSidebar";

import HamburgerIcon from "../components/icons/HamburgerIcon.vue";
import SupportedByMajoo from "../components/home/SupportedByMajoo.vue";

const { setIsSidebarOpened } = useSidebar();

defineProps({
  noHamburger: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="relative w-full h-full flex flex-col">
    <nav class="flex-shrink-0 h-16 bg-green grid grid-cols-[100px,1fr,100px]">
      <div class="flex items-center justify-center">
        <button v-if="!noHamburger" @click="setIsSidebarOpened">
          <HamburgerIcon />
        </button>
      </div>

      <div class="flex items-center justify-center gap-2">
        <SupportedByMajoo />
      </div>

      <div />
    </nav>

    <slot />
  </div>
</template>
