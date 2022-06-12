<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { $customerService } from "@/api";
import WelcomeTitle from "@/components/auth/WelcomeTitle.vue";
import AuthSubmitButton from "@/components/auth/AuthSubmitButton.vue";
import { alertErrorResponse } from "@/helpers/AlertErrorResponse";
import TakenTableNumberMessage from "../components/auth/messages/TakenTableNumberMessage.vue";

const token = ref<string | number>("");
const customMessage = ref<string | undefined>("");

const route = useRoute();
const router = useRouter();

const overrideSubmitButtonClass =
  "!bg-transparent hover:!bg-green border-2 border-green group";

const overrideSubmitButtonTextClass =
  "group-hover:text-white text-green text-sm font-semibold";

const onCopyToken = () => {
  window.navigator.clipboard.writeText(token.value as string).then(() => {
    alert("token berhasil disalin");
  });
};

onMounted(async () => {
  const { table_number: tableNumberQuery } = route.query;
  if (!tableNumberQuery) router.replace({ name: "login" });

  try {
    const response = await $customerService.getTableToken(
      `table_number=${tableNumberQuery}`
    );
    token.value = response.data.data.token;
  } catch (err) {
    alertErrorResponse(err);
    token.value = 0;
  }
});
</script>

<template>
  <div class="w-full h-full flex flex-col justify-end gap-20 p-20">
    <WelcomeTitle />

    <div class="flex flex-col gap-4">
      <form
        class="flex flex-col gap-8 bg-white rounded-xl h-[280px] p-10"
        style="box-shadow: 2px 0px 16px 0px #012f2d0a"
      >
        <TakenTableNumberMessage
          :custom-message="customMessage"
          :token="token"
        />
        <AuthSubmitButton
          :class="overrideSubmitButtonClass"
          type="button"
          @click="onCopyToken"
        >
          <span :class="overrideSubmitButtonTextClass"> Copy </span>
        </AuthSubmitButton>
      </form>
    </div>
  </div>
</template>
