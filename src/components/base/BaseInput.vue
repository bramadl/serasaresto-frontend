<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    default: "Placeholder",
  },
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    required: true,
  },
});

defineEmits<{
  (e: "input", event: Event): void;
}>();
</script>

<template>
  <input
    class="flex-1 py-4 bg-transparent border-b border-read-only placeholder-placeholder font-light text-sm focus:outline-none"
    :placeholder="placeholder"
    :type="type"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>
