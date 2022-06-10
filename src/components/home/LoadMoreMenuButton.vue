<script setup lang="ts">
import LoadingIcon from "../icons/LoadingIcon.vue";

const isLoadingMore = false;
</script>

<template>
  <button
    class="flex items-center justify-center gap-4 w-[300px] h-12 mx-auto border-2 border-green bg-transparent text-green hover:bg-green hover:text-white rounded-lg transition ease-out duration-300"
  >
    <LoadingIcon :class="isLoadingMore && 'animate-spin'" />
    <span>Load More</span>
  </button>
</template>
