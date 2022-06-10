<script setup lang="ts">
import WelcomeFigure from "./WelcomeFigure.vue";
import SupportedByMajoo from "./SupportedByMajoo.vue";
</script>

<template>
  <div class="w-full h-auto flex flex-col items-center justify-center">
    <h1 class="font-semibold text-3xl text-secondary text-center">
      <span class="text-green">Serasa Restaurant</span> Penuh <br />
      Rasa, Harga Terjangkau <br />
      <span class="text-green">Kualitas Juara</span>
    </h1>
    <div class="flex flex-col items-center justify-center mt-6">
      <WelcomeFigure />
      <SupportedByMajoo />
    </div>
  </div>
</template>
