<script setup lang="ts">
import router from "@/router";
import type { JobFormType, JobType } from "@/types";
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const toast = useToast();
const route = useRoute();
const jobID = route.params.id;

const jobTypeList = ref([
  { label: "Full-Time", value: "Full-Time" },
  { label: "Part-Time", value: "Part-Time" },
  { label: "Remote", value: "Remote" },
  { label: "Internship", value: "Internship" },
]);

const salaryList = ref([
  { label: "Under $50K", value: "Under $50K" },
  { label: "$50K - $60K", value: "$50K - $60K" },
  { label: "$60K - $70K", value: "$60K - $70K" },
  { label: "$70K - $80K", value: "$70K - $80K" },
  { label: "$80K - $90K", value: "$80K - $90K" },
  { label: "$90K - $100K", value: "$90K - $100K" },
  { label: "$100K - $110K", value: "$100K - $110K" },
  { label: "$110K - $125K", value: "$110K - $125K" },
  { label: "$125K - $150K", value: "$125K - $150K" },
  { label: "$150K - $175K", value: "$150K - $175K" },
  { label: "$175K - $200K", value: "$175K - $200K" },
  { label: "Over $200K", value: "Over $200K" },
]);

const form = reactive<JobFormType>({
  title: "",
  type: jobTypeList.value[0].value,
  description: "",
  location: "",
  salary: salaryList.value[0].value,
  company: {
    name: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
  },
});

const state = reactive<{
  job: JobFormType;
  isLoading: boolean;
}>({
  job: {
    title: "",
    type: jobTypeList.value[0].value,
    description: "",
    location: "",
    salary: salaryList.value[0].value,
    company: {
      name: "",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  },
  isLoading: true,
});

async function updateJob() {
  const updatedJob: JobType = {
    id: String(jobID),
    title: form.title,
    type: form.type,
    description: form.description,
    location: form.location,
    salary: form.salary,
    company: {
      name: form.company.name,
      description: form.company.description,
      contactEmail: form.company.contactEmail,
      contactPhone: form.company.contactPhone,
    },
  };

  try {
    const confirm = window.confirm("Are sure you want to update this job?");
    if (confirm) {
      const response = await fetch(`/api/jobs/${jobID}`, {
        method: "PUT",
        body: JSON.stringify(updatedJob),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        router.push(`/jobs/${data.id}`);
        toast.add({
          title: "Update Job",
          description: "The job was updatedJob successfully",
          color: "primary",
        });
      }
    }
  } catch (error) {
    console.error("Error adding job:", error);
  }
}

onMounted(async () => {
  try {
    const response = await fetch(`/api/jobs/${jobID}`, { method: "GET" });
    const data = await response.json();

    // Putting existing data into form
    if (response.ok) {
      state.job = data;
      Object.assign(form, {
        type: state.job.type,
        title: state.job.title,
        salary: state.job.salary,
        location: state.job.location,
        description: state.job.description,
        company: { ...state.job.company },
      });
    }
  } catch (error) {
    console.error("Error loading job:", error);
  } finally {
    state.isLoading = false;
  }
});
</script>

<template>
  <UContainer class="max-w-2xl py-20">
    <UCard variant="subtle" class="px-2 py-8 shadow-md">
      <form @submit.prevent="updateJob">
        <h2 class="mb-6 text-center text-4xl font-semibold">Edit Job</h2>

        <div class="mb-4">
          <UFormField label="Job Type" required>
            <USelect
              v-model="form.type"
              name="job_type"
              :items="jobTypeList"
              size="xl"
              :ui="{
                base: 'w-full',
              }"
            ></USelect>
          </UFormField>
        </div>

        <div class="mb-4">
          <UFormField label="Job Title" required>
            <UInput
              type="text"
              name="job_title"
              v-model="form.title"
              placeholder="Vue.js Developer"
              required
              size="xl"
              :ui="{
                root: 'w-full',
              }"
            />
          </UFormField>
        </div>

        <div class="mb-4">
          <UFormField label="Job Description" required>
            <UTextarea
              size="xl"
              :rows="4"
              name="job_description"
              v-model="form.description"
              required
              placeholder="Add any job duties, expectations, requirements, etc"
              :ui="{
                root: 'w-full',
              }"
            ></UTextarea>
          </UFormField>
        </div>

        <div class="mb-4">
          <UFormField label="Salary" required>
            <USelect
              v-model="form.salary"
              name="salary"
              :items="salaryList"
              size="xl"
              required
              :ui="{
                base: 'w-full',
              }"
            ></USelect>
          </UFormField>
        </div>

        <div class="mb-4">
          <UFormField label="Location" required>
            <UInput
              type="text"
              name="location"
              v-model="form.location"
              placeholder="Company Location"
              required
              size="xl"
              :ui="{
                root: 'w-full',
              }"
            />
          </UFormField>
        </div>

        <h3 class="mb-4 text-2xl">Company Info</h3>

        <div class="mb-4">
          <UFormField label="Company Name" required>
            <UInput
              type="text"
              name="company_name"
              v-model="form.company.name"
              placeholder="Company Name"
              required
              size="xl"
              :ui="{
                root: 'w-full',
              }"
            />
          </UFormField>
        </div>

        <div class="mb-4">
          <UFormField label="Company Description" required>
            <UTextarea
              size="xl"
              :rows="4"
              v-model="form.company.description"
              name="company_description"
              required
              placeholder="What does you company do?"
              :ui="{
                root: 'w-full',
              }"
            ></UTextarea>
          </UFormField>
        </div>

        <div class="mb-4">
          <UFormField label="Contact Email" required>
            <UInput
              type="email"
              name="contact_email"
              v-model="form.company.contactEmail"
              placeholder="Contact email for applicants"
              required
              size="xl"
              :ui="{
                root: 'w-full',
              }"
            />
          </UFormField>
        </div>

        <div class="mb-4">
          <UFormField label="Contact Phone">
            <UInput
              type="text"
              name="contact_phone"
              v-model="form.company.contactPhone"
              placeholder="Optional phone for applicants"
              size="xl"
              :ui="{
                root: 'w-full',
              }"
            />
          </UFormField>
        </div>

        <div>
          <UButton
            type="submit"
            size="xl"
            color="neutral"
            :ui="{
              base: 'block text-center w-full',
            }"
            >Update Job</UButton
          >
        </div>
      </form>
    </UCard>
  </UContainer>
</template>
