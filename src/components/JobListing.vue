<script lang="ts" setup>
import type { JobType } from "@/types";
import { computed, ref } from "vue";

const props = defineProps<{
  job: JobType;
}>();

const showFullDescription = ref(false);
const truncatedDescription = computed(() => {
  let description = props.job.description;
  if (!showFullDescription.value && description.length > 90) {
    description = description.slice(0, 100) + "...";
  }
  return description;
});

function toggleShowDescription() {
  showFullDescription.value = !showFullDescription.value;
}
</script>

<template>
  <UCard
    variant="subtle"
    :ui="{
      root: 'shadow-md',
    }"
  >
    <template #header>
      <div class="my-2 text-neutral-500">{{ job.type }}</div>
      <h3 class="text-xl font-bold">{{ job.title }}</h3>
    </template>

    <div class="job-listing-body">
      <div class="mb-2">
        <p>{{ truncatedDescription }}</p>
        <UButton
          variant="link"
          color="neutral"
          @click="toggleShowDescription"
          :label="showFullDescription ? 'Show less' : 'Show more'"
          :ui="{
            base: 'cursor-pointer px-0',
          }"
        />
      </div>
      <h3>{{ job.salary }} / Year</h3>
    </div>

    <template #footer>
      <div class="flex flex-col justify-between lg:flex-row">
        <div
          class="flex items-center gap-2 text-neutral-700 max-lg:mb-2 dark:text-neutral-400"
        >
          <UIcon name="fa6-solid:location-dot" />
          <span>{{ job.location }}</span>
        </div>
        <UButton
          :to="`/jobs/${job.id}`"
          size="lg"
          color="neutral"
          :ui="{
            base: 'block text-center',
          }"
          >Read More</UButton
        >
      </div>
    </template>
  </UCard>
</template>
