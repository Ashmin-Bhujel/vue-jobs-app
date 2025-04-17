<script lang="ts" setup>
import type { ColorType } from "@/types";

withDefaults(
  defineProps<{
    title: string;
    content: string;
    url: string;
    callToAction: string;
    bgColor?: string;
    bgCallToAction?: ColorType;
  }>(),
  {
    title: "Card Title",
    content: "Card Content",
    url: "/",
    callToAction: "Call to Action",
    bgColor: "",
    bgCallToAction: "primary",
  },
);
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{
      root: bgColor,
    }"
  >
    <template #header>
      <h2 class="text-2xl font-bold">{{ title }}</h2>
    </template>

    <p class="mb-4">{{ content }}</p>
    <UButton :to="url" :color="bgCallToAction" size="lg">{{
      callToAction
    }}</UButton>
  </UCard>
</template>
