import { ref } from "vue";

const isSidebarOpened = ref<boolean>(false);

export function useSidebar() {
  const setIsSidebarOpened = (): void => {
    isSidebarOpened.value = !isSidebarOpened.value;
  };

  return {
    isSidebarOpened,
    setIsSidebarOpened,
  };
}
