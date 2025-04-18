<template>
  <UContainer class="flex min-h-screen items-center justify-center">
    <div class="text-center">
      <h1
        class="mb-4 flex items-center justify-center gap-2 text-4xl font-bold"
      >
        <UIcon name="lucide:alert-circle" class="text-error-500" />
        <span>404 Not Found</span>
      </h1>
      <p class="mb-6 text-neutral-600 dark:text-neutral-400">
        The page you're looking for doesn't exist.
      </p>
      <UButton to="/" color="neutral" size="lg">Back to Home</UButton>
    </div>
  </UContainer>
</template>
