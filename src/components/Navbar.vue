<script lang="ts" setup>
import logo from "@/assets/images/logo.png";
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref } from "vue";

const items = ref<NavigationMenuItem[]>([
  [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Jobs",
      to: "/jobs",
    },
    {
      label: "Add Job",
      to: "/jobs/add",
    },
  ],
]);
</script>

<template>
  <UContainer class="flex items-center justify-between py-4">
    <RouterLink to="/">
      <img :src="logo" alt="" class="h-10" />
    </RouterLink>
    <UNavigationMenu
      :highlight="true"
      highlight-color="primary"
      orientation="horizontal"
      :items="items"
      :ui="{
        root: 'w-full justify-center max-md:hidden',
        list: 'gap-6',
      }"
    />
    <ColorModeButton />
  </UContainer>
</template>
