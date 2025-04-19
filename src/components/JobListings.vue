<script lang="ts" setup>
import type { JobType } from "@/types";
import { onMounted, reactive, ref } from "vue";

withDefaults(
  defineProps<{
    limit?: number;
    showButton?: boolean;
  }>(),
  {
    showButton: false,
  },
);

const state = reactive<{ jobs: JobType[]; isLoading: boolean }>({
  jobs: [],
  isLoading: true,
});

onMounted(async () => {
  try {
    const response = await fetch("/api/jobs", {
      method: "GET",
    });
    const data = await response.json();
    state.jobs = data;
  } catch (error) {
    console.log("Error fetching jobs data!");
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <!-- <section class="bg-info-50 dark:bg-info-950/10"> -->
  <section>
    <UContainer class="py-10">
      <h2 class="mb-6 text-center text-3xl font-bold">Browse Jobs</h2>

      <!-- Spinner -->
      <div
        v-if="state.isLoading"
        class="flex items-center justify-center py-10"
      >
        <UIcon
          name="svg-spinners:ring-resize"
          class="text-6xl text-neutral-500"
        />
      </div>

      <!-- Jobs list -->
      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <JobListing
          v-for="job in state.jobs.slice(0, limit || state.jobs.length)"
          :key="job.id"
          :job
        />
      </div>
    </UContainer>

    <UContainer class="max-w-lg pb-10" v-if="showButton && !state.isLoading">
      <UButton
        to="/jobs"
        color="neutral"
        size="lg"
        :ui="{
          base: 'block px-6 py-4 text-center',
        }"
        >View All Jobs</UButton
      >
    </UContainer>
  </section>
</template>
