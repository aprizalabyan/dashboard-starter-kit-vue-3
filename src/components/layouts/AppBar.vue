<template>
  <v-app-bar class="px-3" height="64" color="white">
    <div class="d-flex align-center justify-space-between w-100">
      <div class="d-flex">
        <v-btn icon="mdi-menu" size="small" @click="toggleDrawer"/>
      </div>
      <div class="d-flex align-center ga-4">
        <v-avatar size="36" color="grey-lighten-2" icon="mdi-account" />
        <span>My Profile</span>
        <v-btn icon="mdi-chevron-down" size="small" />
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useDrawer } from "@/composables/useDrawer";

const { toggleDrawer } = useDrawer()
</script>

<style scoped></style>
