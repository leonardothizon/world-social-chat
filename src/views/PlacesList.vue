<template>
  <div class="places-list lg:p-6 flex flex-col gap-6 justify-between lg:flex-row flex-wrap">
    <PlaceCard v-for="place in places" :key="place.code" :place="place" />    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Place from '@/types/Place';
import UsePlaces from '@/composables/places';
import { useRouter } from 'vue-router';
import PlaceCard from '@/components/PlaceCard.vue';

export default defineComponent({
  components: { PlaceCard },
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
