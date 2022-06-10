<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";

import BaseInput from "../base/BaseInput.vue";
import PhoneNumberInputIcon from "../icons/PhoneNumberInputIcon.vue";
import UsernameInputIcon from "../icons/UsernameInputIcon.vue";
import BaseInputLabel from "../base/BaseInputLabel.vue";

const { username, token, setUsername, setPhoneNumber } = useAuth();

const handleOnChange = (event: Event, target: "username" | "token") => {
  const value = (event.target as HTMLInputElement).value;
  if (target === "username") setUsername(value);
  if (target === "token") setPhoneNumber(value);
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <BaseInputLabel>
        <template #icon>
          <UsernameInputIcon />
        </template>
        <BaseInput
          placeholder="Isi Nama Anda"
          :value="username"
          @input="(event: Event) => handleOnChange(event, 'username')"
        />
      </BaseInputLabel>
    </div>

    <div>
      <BaseInputLabel>
        <template #icon>
          <PhoneNumberInputIcon />
        </template>
        <BaseInput
          placeholder="Isi Token Anda"
          :value="token"
          @input="(event: Event) => handleOnChange(event, 'token')"
        />
      </BaseInputLabel>
    </div>
  </div>
</template>
