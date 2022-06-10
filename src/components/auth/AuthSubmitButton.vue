<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "submit",
  },
});

const buttonType = computed<"submit" | "button" | "reset" | undefined>(() => {
  return props.type as "submit" | "button" | "reset" | undefined;
});
</script>

<template>
  <button
    class="block w-full h-auto py-2.5 px-4 rounded-lg bg-green hover:bg-highlight transition ease-out duration-300 focus:outline-none focus:ring-2 focus:ring-green focus:ring-opacity-50"
    :type="buttonType"
  >
    <slot>
      <span class="text-white text-sm font-semibold"> Masuk </span>
    </slot>
  </button>
</template>
