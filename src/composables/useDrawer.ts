import { ref } from "vue";

const drawer = ref(true);

export function useDrawer() {
  function toggleDrawer() {
    drawer.value = !drawer.value;
  }
  return { drawer, toggleDrawer };
}
