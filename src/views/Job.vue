<script setup lang="ts">
import type { JobType } from "@/types";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const jobId = route.params.id;

const state = reactive<{ job: JobType; isLoading: boolean }>({
  job: {
    id: 0,
    title: "",
    type: "",
    description: "",
    location: "",
    salary: "",
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  },
  isLoading: true,
});

async function deleteJob() {
  try {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (confirm) {
      const response = await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
      const data = await response.json();
      if (response.ok) {
        toast.add({
          title: "Delete Job",
          description: `The job "${data.title}" has been deleted`,
          color: "primary",
        });
        router.push("/jobs");
      }
    }
  } catch (error) {
    console.error("Error deleting job:", error);
  }
}

onMounted(async () => {
  try {
    const response = await fetch(`/api/jobs/${jobId}`, {
      method: "GET",
    });
    const data = await response.json();
    state.job = data;
  } catch (error) {
    console.log("Error fetching job data!");
  } finally {
    state.isLoading = true;
  }
});
</script>

<template>
  <!-- Go Back -->
  <section>
    <UContainer class="px-6 py-4">
      <UButton
        to="/jobs"
        variant="link"
        color="neutral"
        icon="lucide:arrow-left"
        size="lg"
        >Back to Job Listings</UButton
      >
    </UContainer>
  </section>

  <!-- <section class="bg-primary-50 dark:bg-info-950/10"> -->
  <section>
    <UContainer class="py-10">
      <div class="grid max-w-full grid-cols-1 gap-6 md:grid-cols-[6fr_4fr]">
        <main>
          <UCard
            variant="subtle"
            :ui="{
              root: 'text-center shadow-md md:text-left',
            }"
          >
            <template #header>
              <div class="mb-2 text-sm text-neutral-700 dark:text-neutral-400">
                {{ state.job.type }}
              </div>
              <h1 class="text-3xl font-bold">{{ state.job.title }}</h1>
            </template>

            <div
              class="flex items-center justify-center gap-2 align-middle text-neutral-700 md:justify-start dark:text-neutral-400"
            >
              <UIcon name="fa6-solid:location-dot" />
              <p>{{ state.job.location }}</p>
            </div>
          </UCard>

          <UCard
            variant="subtle"
            :ui="{
              root: 'mt-6 shadow-md',
            }"
          >
            <template #header>
              <h3
                class="text-lg font-bold text-neutral-700 dark:text-neutral-400"
              >
                Job Description
              </h3>
            </template>

            <p>
              {{ state.job.description }}
            </p>

            <template #footer>
              <h3
                class="mb-2 text-lg font-bold text-neutral-700 dark:text-neutral-400"
              >
                Salary
              </h3>
              <p>{{ state.job.salary }} / Year</p>
            </template>
          </UCard>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <UCard
            variant="subtle"
            :ui="{
              root: 'shadow-md',
            }"
          >
            <template #header>
              <h3
                class="mb-1 text-sm font-bold text-neutral-700 dark:text-neutral-400"
              >
                Company Info
              </h3>
              <h2 class="text-2xl">NewTek Solutions</h2>
            </template>

            <p>
              {{ state.job.company.description }}
            </p>

            <template #footer>
              <h3 class="text-neutral-700 dark:text-neutral-400">
                Contact Email:
              </h3>
              <p
                class="my-2 overflow-auto bg-neutral-200 p-2 font-bold dark:bg-neutral-900/50"
              >
                {{ state.job.company.contactEmail }}
              </p>

              <h3 class="text-neutral-700 dark:text-neutral-400">
                Contact Phone:
              </h3>
              <p
                class="mt-2 overflow-auto bg-neutral-200 p-2 font-bold dark:bg-neutral-900/50"
              >
                {{ state.job.company.contactPhone }}
              </p>
            </template>
          </UCard>

          <!-- Manage -->
          <UCard
            variant="subtle"
            :ui="{
              root: 'mt-6 shadow-md',
            }"
          >
            <h3 class="mb-6 text-xl font-bold">Manage Job</h3>
            <UButton
              :to="`/jobs/${state.job.id}/edit`"
              size="lg"
              color="neutral"
              :ui="{
                base: 'block w-full text-center',
              }"
              >Edit Job</UButton
            >
            <UButton
              size="lg"
              color="error"
              @click="deleteJob"
              :ui="{
                base: 'block w-full text-center mt-4 cursor-pointer',
              }"
            >
              Delete Job
            </UButton>
          </UCard>
        </aside>
      </div>
    </UContainer>
  </section>
</template>
