import { ref } from "vue";

const username = ref<string>("");
const token = ref<string>("");

export function useAuth() {
  const setUsername = (value: string) => {
    username.value = value;
  };

  const setPhoneNumber = (value: string) => {
    token.value = value;
  };

  return {
    username,
    token,
    setUsername,
    setPhoneNumber,
  };
}
