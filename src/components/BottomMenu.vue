<template>
  <nav class="flex justify-between px-6 py-1">
    <NavItems />
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavItems from '@/components/NavItems.vue';

export default defineComponent({
  components: { NavItems }
});
</script>
