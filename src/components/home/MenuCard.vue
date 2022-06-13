<script setup lang="ts">
import { computed, ref } from "vue";

import { useCarts } from "@/composables/useCarts";
import { usePriceFormatter } from "@/composables/usePriceFormatter";
import type { IMenu } from "@/interfaces/IMenu";

import DecrementAmountIcon from "../icons/DecrementAmountIcon.vue";
import IncrementAmountIcon from "../icons/IncrementAmountIcon.vue";
import NoteModal from "../checkout/NoteModal.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    validator(value: string) {
      return ["DRINK", "FOOD"].includes(value);
    },
  },
});

defineEmits<{
  (e: "addItem"): void;
  (e: "removeItem"): void;
}>();

const { formattedPrice } = usePriceFormatter();
const { cart, updateItem } = useCarts();

const isOpen = ref<boolean>(false);

const menuOnCartQuantity = computed<number>(() => {
  const item = cart.cartItems.find((item) => item.menu.id === props.id);
  if (!item) return 0;
  return item.quantity;
});

const menuOnCartNote = computed<string>(() => {
  const item = cart.cartItems.find((item) => item.menu.id === props.id);
  if (!item) return "";
  return item.note;
});

const setMenuOnCartNote = async (value: string) => {
  const item = cart.cartItems.find((item) => item.menu.id === props.id);
  if (!item) return;
  item.note = value;
  updateItem(props as IMenu, { quantity: item.quantity, note: value.trim() });
};
</script>

<template>
  <div
    class="w-full h-full flex flex-col gap-6 p-6 rounded-lg"
    :class="inStock ? 'bg-white text-primary' : 'bg-[#F5F5F5] text-secondary'"
    style="box-shadow: 2px 0px 16px 0px #012f2d0a"
  >
    <div class="flex items-center justify-between gap-4">
      <img
        :alt="name"
        class="flex-shrink-0 w-20 h-20 object-cover rounded-full"
        :class="!inStock && 'grayscale'"
        :src="thumbnail"
      />
      <div class="flex-1">
        <p class="font-semibold text-sm">{{ name }}</p>
        <p class="my-2 text-xs text-secondary">{{ description }}</p>
        <p class="font-semibold text-sm">{{ formattedPrice(price) }}</p>
      </div>
    </div>

    <button
      class="flex items-start w-full focus:outline-none py-2 bg-transparent border-b border-read-only focus:border-green text-placeholder font-light text-sm text-left h-12 transition ease-out duration-300"
      :disabled="!inStock || menuOnCartQuantity === 0"
      @click="isOpen = true"
    >
      {{ menuOnCartNote || "Catatan..." }}
    </button>

    <NoteModal
      :is-open="isOpen"
      :value="menuOnCartNote"
      @update:note="setMenuOnCartNote"
      @close="isOpen = false"
    />

    <div v-if="inStock" class="flex items-center justify-between px-10">
      <button @click="$emit('removeItem')">
        <DecrementAmountIcon />
      </button>

      <span class="text-xl text-secondary">
        {{ menuOnCartQuantity }}
      </span>

      <button @click="$emit('addItem')">
        <IncrementAmountIcon />
      </button>
    </div>

    <div v-else class="flex items-center justify-center">
      <p class="font-semibold text-sm text-red">Stok Tidak Tersedia</p>
    </div>
  </div>
</template>
