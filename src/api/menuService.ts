import type { AxiosInstance } from "axios";

export default ($axios: AxiosInstance) => ({
  getMenus(query: string) {
    return $axios.get(`/menus/list?${query}`);
  },
});
