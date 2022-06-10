<script setup lang="ts">
defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <div class="absolute left-1/2 -translate-x-1/2 bottom-10 w-full px-10">
    <button
      class="flex items-center justify-center gap-4 w-full h-auto py-2.5 px-4 bg-green rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-opacity-50"
      @click="$emit('click')"
    >
      <slot />
    </button>
  </div>
</template>
