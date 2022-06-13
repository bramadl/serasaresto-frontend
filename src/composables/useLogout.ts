import { useRouter } from "vue-router";

import { $customerService } from "@/api";
import type { AxiosError } from "axios";
import type { IApiError } from "@/interfaces/IApiError";

export function useLogout() {
  const router = useRouter();

  const logout = async () => {
    const token = localStorage.getItem("table_token") as string;
    try {
      await $customerService.logout(token);
      localStorage.removeItem("customer_name");
      localStorage.removeItem("table_name");
      localStorage.removeItem("table_token");
      router.replace({ name: "login", force: true });
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.data) {
          const { message } = error.response.data as IApiError;
          alert(message);
        } else {
          alert("Server sedang bermasalah. Silahkan coba beberapa saat lagi.");
        }
      } else {
        alert("Server sedang bermasalah. Silahkan coba beberapa saat lagi.");
      }
    }
  };

  return {
    logout,
  };
}
