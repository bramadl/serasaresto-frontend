<script setup lang="ts">
import SearchIcon from "../icons/SearchIcon.vue";
import BaseInputLabel from "../base/BaseInputLabel.vue";
import BaseInput from "../base/BaseInput.vue";

defineProps({
  value: {
    type: String,
    default: "",
  },
});

const emits = defineEmits<{
  (e: "input", value: string): void;
}>();

const handleOnInput = (event: Event): void => {
  const value = (event.target as HTMLInputElement).value;
  emits("input", value);
};
</script>

<template>
  <BaseInputLabel>
    <template #icon>
      <SearchIcon />
    </template>
    <BaseInput
      placeholder="Cari Makanan / Minuman"
      :value="value"
      @input="handleOnInput"
    />
  </BaseInputLabel>
</template>
