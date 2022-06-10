<script setup lang="ts">
import LoadingIcon from "../../icons/LoadingIcon.vue";

defineProps({
  customMessage: {
    type: String,
    default: null,
  },
  token: {
    type: [String, Number],
    default: "",
  },
});
</script>

<template>
  <div
    class="flex-1 flex flex-col items-center justify-center gap-6 border-b border-read-only"
  >
    <p class="text-lg text-secondary">Nomor Token Anda :</p>
    <strong
      class="w-full flex items-center justify-center font-semibold text-sm text-primary"
    >
      <template v-if="typeof token === 'string'">
        <span
          v-if="!token.trim().length"
          class="w-full flex items-center justify-center gap-2"
        >
          <LoadingIcon class="animate-spin" />
          Generating token...
        </span>

        <span v-else class="block w-full line-clamp-1">
          {{ token }}
        </span>
      </template>

      <span v-else-if="typeof token === 'number'">
        {{ customMessage }}
      </span>
    </strong>
  </div>
</template>
