<template>
  <v-layout>
    <NavigationDrawer />
    <AppBar />
    <v-main class="w-full">
      <RouterView />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import NavigationDrawer from "@/components/layouts/NavigationDrawer.vue";
import AppBar from "@/components/layouts/AppBar.vue";
</script>

<style scoped></style>
