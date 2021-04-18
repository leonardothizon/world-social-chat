<template>
  <h2 v-if="placeName">Welcome to {{ placeName }}!</h2>
  <h2 v-else class="text-red-500">Sorry, this place was not found</h2>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import UsePlaces from '@/composables/places';
import Place from '@/types/Place';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const { places }: { places: Place[] } = UsePlaces();
    const route = useRoute();
    const placeCode = computed(() => {
      return Array.isArray(route.params.placename)
        ? route.params.placename[0]
        : route.params.placename;
    });
    
    const placeName = ref('');

    const setPlaceName = function (placeCode: string): void {
      placeName.value =
        places.find((place) => place.code === placeCode)?.name || '';
    };

    setPlaceName(placeCode.value);
    
    watch(placeCode, (newValue) => {
      setPlaceName(newValue);
    });

    return { placeName };
  }
});
</script>
