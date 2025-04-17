<script lang="ts" setup>
import jobsData from "@/jobs.json";
import type { JobType } from "@/types";
import { ref } from "vue";

const jobs = ref<JobType[]>(jobsData);
</script>

<template>
  <section class="bg-info-50 dark:bg-info-950/10">
    <UContainer class="py-10">
      <h2 class="text-primary-500 mb-6 text-center text-3xl font-bold">
        Browse Jobs
      </h2>

      <!-- Jobs list -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <JobListing v-for="job in jobs" :key="job.id" :job />
      </div>
    </UContainer>
  </section>
</template>
