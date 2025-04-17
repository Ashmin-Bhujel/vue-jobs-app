<script lang="ts" setup>
import type { JobType } from "@/types";

defineProps<{
  job: JobType;
}>();
</script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div class="mb-6">
        <div class="my-2 text-neutral-500">{{ job.type }}</div>
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
      </div>
    </template>

    <div class="job-listing-body">
      <div class="mb-5">
        {{ job.description }}
      </div>
      <h3 class="text-primary-500 mb-2">{{ job.salary }} / Year</h3>
    </div>

    <template #footer>
      <div class="mb-4 flex flex-col justify-between lg:flex-row">
        <div class="text-warning-700 mb-3 flex items-center gap-2">
          <UIcon name="fa6-solid:location-dot" />
          <span>{{ job.location }}</span>
        </div>
        <UButton :to="`/job/${job.id}`" size="lg">Read More</UButton>
      </div>
    </template>
  </UCard>
</template>
