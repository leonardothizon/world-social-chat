<template>
  <div class="flex flex-col p-5 w-full lg:w-1/2 m-auto h-full overflow-hidden">
    <h2 class="text-lg font-bold">Welcome to the World Chat!</h2>
    <p class="mt-3">Meet people around the world, start by clicking <a href="#/places" class="text-purple-800 hover:underline">here</a> and select a place to start chatting.</p>
    <img src="@/assets/begin_chat.svg" alt="Begin Chat" class="flex-1 max-h-60 m-auto">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: 'Home'
});
</script>
