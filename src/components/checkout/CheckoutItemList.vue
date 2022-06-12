<script setup lang="ts">
import { ref } from "vue";

import NoteModal from "./NoteModal.vue";
import EditIcon from "../../components/icons/EditIcon.vue";
import DecrementAmountIcon from "../../components/icons/DecrementAmountIcon.vue";
import IncrementAmountIcon from "../../components/icons/IncrementAmountIcon.vue";

defineProps({
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
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 pb-8 border-b border-read-only"
  >
    <img
      alt="title"
      class="flex-shrink-0 w-20 h-20 object-cover rounded-full"
      src="https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1556&q=80"
    />
    <div class="flex-1 flex flex-col gap-2">
      <p class="font-semibold text-sm">Prawn with Salad</p>
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
          <DecrementAmountIcon />
          <span class="font-semibold text-sm text-secondary"> 2 </span>
          <IncrementAmountIcon />
        </div>
        <p class="font-semibold text-sm text-primary">Rp 40.000</p>
      </div>
    </div>

    <NoteModal
      :is-open="isOpen"
      :value="cartItem.note"
      @close="isOpen = false"
    />
  </div>
</template>
