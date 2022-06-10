<script setup lang="ts">
defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <header class="flex items-center gap-2">
    <h2 class="font-semibold text-primary text-xl">{{ label }}</h2>
    <component :is="icon" />
  </header>
</template>
