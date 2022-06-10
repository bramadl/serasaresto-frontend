<script setup lang="ts">
import ProcessMenuIcon from "../icons/ProcessMenuIcon.vue";
import CircleSuccessIcon from "../icons/CircleSuccessIcon.vue";

defineProps({
  success: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="flex items-center gap-2 py-2.5 px-4 rounded-md"
    :class="success ? 'bg-[#EBFAED]' : 'bg-[#FAF7EB]'"
  >
    <ProcessMenuIcon v-if="!success" />
    <CircleSuccessIcon v-else class="w-6 h-6" />
    <span class="text-sm" :class="success ? 'text-green' : 'text-yellow'">
      {{ success ? "Selesai" : "Diproses" }}
    </span>
  </div>
</template>
