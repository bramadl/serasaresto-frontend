import type { AxiosInstance } from "axios";

export default ($axios: AxiosInstance) => ({
  makeOrder() {
    return $axios.post(
      "/orders",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("table_token")}`,
        },
      }
    );
  },
  viewOrder(id: string) {
    return $axios.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("table_token")}`,
      },
    });
  },
  getOrderHistories() {
    return $axios.get(`/orders/histories`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("table_token")}`,
      },
    });
  },
});
