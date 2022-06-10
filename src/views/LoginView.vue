<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import WelcomeTitle from "@/components/auth/WelcomeTitle.vue";
import AuthForm from "@/components/auth/AuthForm.vue";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton.vue";
import { $customerService } from "@/api";
import type { AxiosError } from "axios";
import type { IApiError } from "@/interfaces/IApiError";
import { useRouter } from "vue-router";

const router = useRouter();
const { username, token } = useAuth();

const onSubmit = async (event: Event) => {
  event.preventDefault();

  const params = {
    customer_name: username.value,
    table_token: token.value,
  };

  try {
    const response = await $customerService.reserveTable(params);
    const { customerName, tableNumber, tableToken } = response.data.data;
    localStorage.setItem("customer_name", customerName);
    localStorage.setItem("table_name", tableNumber);
    localStorage.setItem("table_token", tableToken);
    router.replace({ name: "menu", force: true });
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      const { message } = error.response?.data as IApiError;
      alert(message);
    } else {
      alert("Server sedang bermasalah. Silahkan coba beberapa saat lagi.");
    }
  }
};
</script>

<template>
  <div class="w-full h-full flex flex-col justify-end gap-20 p-20">
    <WelcomeTitle />

    <div class="flex flex-col gap-4">
      <!-- :class="!isTableFull ? '' : 'items-center justify-center'" -->
      <form
        class="flex flex-col gap-8 bg-white rounded-xl h-[280px] p-10"
        style="box-shadow: 2px 0px 16px 0px #012f2d0a"
        @submit="onSubmit"
      >
        <AuthForm />
        <AuthSubmitButton />
      </form>
    </div>
  </div>
</template>
