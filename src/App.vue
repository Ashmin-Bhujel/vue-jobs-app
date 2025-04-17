<template>
  <UApp>
    <Navbar />
    <Hero />
    <HomeCards />
    <JobListings :limit="3" :show-button="true" />
  </UApp>
</template>
