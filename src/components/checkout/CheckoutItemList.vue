<script setup lang="ts"></script>

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
        <slot name="description" />
      </p>
      <div class="flex items-center justify-between">
        <slot name="amount" />
      </div>
    </div>
  </div>
</template>
