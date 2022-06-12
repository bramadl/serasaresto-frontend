import type { IApiError } from "@/interfaces/IApiError";
import type { AxiosError } from "axios";

export const alertErrorResponse = (err: unknown) => {
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
};
