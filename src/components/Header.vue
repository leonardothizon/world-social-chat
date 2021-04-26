<template>
  <header class="app-header flex py-4 px-8 content-center items-center">
    <div class="user-profile-image cursor-pointer">
      <img
        src="/img/profile.jpg"
        alt="User Image"
        class="rounded-full w-12 h-12 object-cover"
      />
    </div>
    <h1 class="lg:ml-4 flex-1 lg:flex-grow-1 lg:max-w-32 text-center lg:text-left text-3xl text-white">
      {{ appTitle }}
    </h1>
    <nav class="hidden justify-between lg:justify-around w-1/2 lg:flex">
      <NavItems />
    </nav>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 fill-current text-white cursor-pointer lg:hidden"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </header>
</template>

<script setup lang="ts">

import NavItems from '@/components/NavItems.vue';

const appTitle = 'World Social Chat';
</script>
