<template>
  <Header />
  <div class="app-content rounded-3xl">
    <router-view />
  </div>
  <BottomMenu class="lg:hidden" />
</template>

<script setup lang="ts">

import Header from '@/components/Header.vue';
import BottomMenu from '@/components/BottomMenu.vue';

</script>

<style lang="scss">
:root {
  --purple: #30336B;
  --purple-dark: #130F40;
  --white: #FFFFFF;
  --gray: #535C68;
};
body {
  background-color: var(--purple);
}
.app-content {
  background-color: #FFF;
  height: calc(100vh - 8.5rem);
  overflow-y: auto;
  @media (min-width: 1024px) {
    height: calc(100vh - 6rem);
  }
}
</style>
