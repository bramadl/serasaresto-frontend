import type { AxiosInstance } from "axios";

export default ($axios: AxiosInstance) => ({
  getTableToken(query: string) {
    return $axios.post(`/customers/generate/table/token?${query}`);
  },
  reserveTable(params: { customer_name: string; table_token: string }) {
    return $axios.post(`/customers/reserve/table`, {
      customer_name: params.customer_name,
      table_token: params.table_token,
    });
  },
  logout(token: string) {
    return $axios.post(`/customers/logout/application`, {
      table_token: token,
    });
  },
});
