<template>
  <v-navigation-drawer v-model="drawer" :rail="rail" color="white">
    <div class="px-4 py-5">Logo</div>
    <v-list nav>
      <v-list-item
        v-for="(item, i) in ['components', 'others']"
        :key="i"
        class="text-capitalize"
        link
        color="primary"
        density="comfortable"
        :active="currentPage.includes(item)"
        :to="item"
      >
        <span>{{ item }}</span>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDrawer } from "@/composables/useDrawer";
import router from "@/router";
import { ref, computed } from "vue";

const { drawer } = useDrawer()
const rail = ref(false);

const currentPage = computed(() => router.currentRoute.value.path);
</script>

<style scoped></style>
