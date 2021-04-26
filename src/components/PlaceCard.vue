<template>
  <div
    class="place-card lg:shadow-md lg:hover:shadow-lg flex items-center lg:border lg:border-gray rounded-2xl p-6 lg:w-5/11 xl:w-32% cursor-pointer"
  >
    <img
      :src="place.img"
      alt="Rio de Janeiro"
      class="rounded-full w-16 h-16 lg:w-32 lg:h-32 object-cover"
    />
    <div
      class="content ml-4 flex flex-col flex-1 content-between justify-around"
    >
      <div class="flex content-between">
        <h3 class="place-name flex-1 text-lg font-bold">{{ place.name }}</h3>
        <span class="counter">3 online</span>
      </div>
      <p class="place-last-message">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit in a non
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Place from '@/types/Place';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    place: Object as () => Place
  },
  setup(props) {
    const placeProp = ref(props.place);

    return { placeProp };
  }
});
</script>

<style lang="scss">
.place-card {
  position: relative;
  @media (max-width: 1024px) {
    &:after {
      content: '';
      height: 3px;
      border-top: 1px solid #DDD;
      // width: 50%;
      position: absolute;
      bottom: -1rem;
      right: 5rem;
      left: 5rem;
    }
  }
}
</style>