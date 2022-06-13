<script setup lang="ts">
import { ref } from "vue";

import { useCarts } from "@/composables/useCarts";
import { usePriceFormatter } from "@/composables/usePriceFormatter";
import type { IMenu } from "@/interfaces/IMenu";

import EditIcon from "../../components/icons/EditIcon.vue";
import DecrementAmountIcon from "../../components/icons/DecrementAmountIcon.vue";
import IncrementAmountIcon from "../../components/icons/IncrementAmountIcon.vue";
import NoteModal from "./NoteModal.vue";

const props = defineProps({
  cartItem: {
    type: Object,
    default: () => {
      return {};
    },
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits<{
  (e: "close"): void;
}>();

const isOpen = ref<boolean>(false);
const cartItemMenu = ref<IMenu>(props.cartItem.menu);

const { updateItem, onAddItem, onRemoveItem } = useCarts();
const { formattedPrice } = usePriceFormatter();

const onUpdateNote = (value: string) => {
  updateItem(props.cartItem.menu, {
    quantity: props.cartItem.quantity,
    note: value.trim(),
  });
};
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 pb-8 border-b border-read-only"
  >
    <img
      alt="title"
      class="flex-shrink-0 w-20 h-20 object-cover rounded-full"
      :src="cartItemMenu.thumbnail"
    />
    <div class="flex-1 flex flex-col gap-2">
      <p class="font-semibold text-sm">{{ cartItemMenu.name }}</p>
      <p class="flex items-center gap-2">
        <span class="font-light text-xs text-secondary">
          Catatan: {{ cartItem.note || "-" }}
        </span>
        <button class="focus:outline-none" type="button" @click="isOpen = true">
          <EditIcon />
        </button>
      </p>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button @click="onRemoveItem(cartItemMenu)">
            <DecrementAmountIcon />
          </button>
          <span class="font-semibold text-sm text-secondary">
            {{ cartItem.quantity }}
          </span>
          <button @click="onAddItem(cartItemMenu)">
            <IncrementAmountIcon />
          </button>
        </div>
        <p class="font-semibold text-sm text-primary">
          {{ formattedPrice(cartItemMenu.price * cartItem.quantity) }}
        </p>
      </div>
    </div>

    <NoteModal
      :is-open="isOpen"
      :value="cartItem.note"
      @update:note="onUpdateNote"
      @close="isOpen = false"
    />
  </div>
</template>
