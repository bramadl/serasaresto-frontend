<script setup lang="ts">
import { computed } from "vue";
import { usePriceFormatter } from "@/composables/usePriceFormatter";

import DecrementAmountIcon from "../icons/DecrementAmountIcon.vue";
import IncrementAmountIcon from "../icons/IncrementAmountIcon.vue";
import { useCarts } from "@/composables/useCarts";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  title: {
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
const { cart } = useCarts();

const menuOnCartQuantity = computed<number>(() => {
  const item = cart.cartItems.find((item) => item.menu.id === props.id);
  if (!item) {
    return 0;
  }
  return item.quantity;
});
</script>

<template>
  <div
    class="w-full h-full flex flex-col gap-6 p-6 rounded-lg"
    :class="inStock ? 'bg-white text-primary' : 'bg-[#F5F5F5] text-secondary'"
    style="box-shadow: 2px 0px 16px 0px #012f2d0a"
  >
    <div class="flex items-center justify-between gap-4">
      <img
        :alt="title"
        class="flex-shrink-0 w-20 h-20 object-cover rounded-full"
        :class="!inStock && 'grayscale'"
        :src="thumbnail"
      />
      <div class="flex-1">
        <p class="font-semibold text-sm">{{ title }}</p>
        <p class="my-2 text-xs text-secondary">{{ description }}</p>
        <p class="font-semibold text-sm">{{ formattedPrice(price) }}</p>
      </div>
    </div>

    <textarea
      class="block w-full focus:outline-none p-2 resize-y bg-transparent border-b border-read-only placeholder-placeholder font-light text-sm"
      :disabled="!inStock"
      placeholder="Catatan..."
    />

    <div v-if="inStock" class="flex items-center justify-between px-10">
      <button>
        <DecrementAmountIcon @click="$emit('removeItem')" />
      </button>

      <span class="text-xl text-secondary">
        {{ menuOnCartQuantity }}
      </span>

      <button>
        <IncrementAmountIcon @click="$emit('addItem')" />
      </button>
    </div>

    <div v-else class="flex items-center justify-center">
      <p class="font-semibold text-sm text-red">Stok Tidak Tersedia</p>
    </div>
  </div>
</template>
