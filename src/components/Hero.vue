<script lang="ts" setup>
withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
  }>(),
  {
    title: "Become a Vue Dev",
    subtitle: "Find the Vue job that fits your skills and needs",
  },
);
</script>

<template>
  <UContainer class="py-20">
    <div class="text-center">
      <h1 class="text-4xl font-extrabold sm:text-5xl md:text-6xl">
        {{ title }}
      </h1>
      <p class="my-4 text-xl">
        {{ subtitle }}
      </p>
    </div>
  </UContainer>
</template>
