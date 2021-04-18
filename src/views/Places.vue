<template>
  <h2>Choose a place to meet people!</h2>
  <div class="flex flex-wrap w-2/3">
    <div
      class="rounded bg-gray-100 p-2 w-1/4 ml-2 mt-2 cursor-pointer hover:bg-gray-200"
      v-for="place in places"
      :key="place.code"
      @click="selectPlace(place)"
    >
      <p class="text-xl font-semibold mb-2">{{ place.name }}</p>
      <div class="flex">
        <div class="text-white bg-black flex text-md rounded p-1 space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
            />
          </svg>
          <span>2/20</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Place from '@/types/Place';
import UsePlaces from '@/composables/places';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();

    const { places } = UsePlaces();

    const selectPlace = (place: Place) => {
      console.log(`travelling to  ${place.name}...`);
      router.push(`/chat/${place.code}`);
    };

    return { places, selectPlace };
  }
});
</script>
