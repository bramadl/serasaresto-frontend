import type { AxiosError } from "axios";
import type { IApiError } from "@/interfaces/IApiError";

export const alertErrorResponse = (err: unknown) => {
  const error = err as AxiosError;
  if (error.response) {
    if (error.response.data) {
      const { status } = error.response;
      if (status === 401 || status === 403) {
        localStorage.removeItem("customer_name");
        localStorage.removeItem("table_name");
        localStorage.removeItem("table_token");
        location.pathname = "/login";
      } else {
        const { message } = error.response.data as IApiError;
        alert(message);
      }
    } else {
      alert("Server sedang bermasalah. Silahkan coba beberapa saat lagi.");
    }
  } else {
    alert("Server sedang bermasalah. Silahkan coba beberapa saat lagi.");
  }
};
