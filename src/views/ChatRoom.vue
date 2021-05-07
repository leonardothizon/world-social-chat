<template>
  <section v-if="placeName" class="h-full w-full relative overflow-hidden">
    <div :style="mapSize" ref="mapEl" class="relative">
      <img
        :src="backgroundImage"
        alt="Place Map"
        class="object-none absolute"
        :style="mapSize"
        ondragstart="return false"
      />
      <UserMark
        class="absolute"
        v-for="user in users"
        :key="user.id"
        :user="user"
        :isCurrentUser="user.id === currentUserId"
      />      
    </div>
    <div
      class="flex gap-2 items-center fixed bottom-16 lg:bottom-8 w-full px-4 outline-none"
    >
      <input
        type="text"
        placeholder="type your message"
        v-model="message"
        class="flex-1 border h-7 text-sm py-1 px-3 outline-none border-purple-800 focus:ring-2 rounded"
        @keydown.enter="sendMessage"
      />
      <button
        class="bg-purple-800 hover:bg-purple-600 rounded-full p-3 text-white outline-none focus:outline-none"
        @click="sendMessage"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  </section>
  <h2 v-else class="text-red-500">Sorry, this place was not found</h2>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  reactive,
  watch,
  onMounted,
  ComputedRef
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

import usePlaces from '@/composables/places';
import Place from '@/types/Place';
import { Message, User } from '@/store';

import UserMark from '@/components/UserMark.vue';

export default defineComponent({
  components: { UserMark },
  setup() {
    const route = useRoute();
    const store = useStore();
    const { places }: { places: Place[] } = usePlaces();

    const users: ComputedRef<User[]> = computed(() => store.state.users);
    const message = ref('');
    const placeName = ref('');
    const mapEl = ref<HTMLElement>();
    const currentUserId = store.state.currentUserId;

    const movingMap = ref(false);

    const initialPos = reactive({
      x: 0 as number,
      y: 0 as number
    });

    onMounted(() => {
      mapEl.value?.addEventListener('mousedown', (evt) => {
        initialPos.x = evt.offsetX;
        initialPos.y = evt.offsetY;
        movingMap.value = true;
      });
      mapEl.value?.addEventListener('mouseup', (evt) => {
        movingMap.value = false;
        initialPos.x = evt.offsetX;
        initialPos.y = evt.offsetY;
      });
      mapEl.value?.addEventListener('mousemove', (evt) => {
        if (mapEl.value && movingMap.value) {
          console.log('mousemove');
          const scrollLeft = evt.offsetX - initialPos.x;
          const scrollTop = evt.offsetY - initialPos.y;
          mapEl.value.parentElement?.scrollBy(scrollLeft * -1, scrollTop * -1);
        }
      });
    });

    const placeCode = computed(() => {
      return Array.isArray(route.params.placename)
        ? route.params.placename[0]
        : route.params.placename;
    });

    const backgroundImage = ref('img/maps/default-map.jpeg');
    let mapSize = reactive({
      width: 1920 + 'px',
      height: 1080 + 'px'
    });
    const place = places.find((place) => place.code === placeCode.value);
    if (place?.map) {
      backgroundImage.value = place?.map;
      mapSize = {
        width: place.mapWidth + 'px',
        height: place.mapHeight + 'px',
      };
    }
    // backgroundImage.value =
    //   places.find((place) => place.code === placeCode.value)?.map ||
    //   'img/maps/default-map.jpeg';

    const setPlaceName = function (placeCode: string): void {
      placeName.value =
        places.find((place) => place.code === placeCode)?.name || '';
      store.commit('setAppTitle', placeName.value);
    };

    setPlaceName(placeCode.value);

    watch(placeCode, (newValue) => {
      setPlaceName(newValue);
    });

    const sendMessage = () => {
      const messageToSend: Message = {
        text: message.value,
        timestamp: new Date()
      };
      store.commit('addMessageToUser', {
        userId: currentUserId,
        message: messageToSend
      });
      message.value = '';
    };

    return {
      currentUserId,
      users,
      message,
      placeName,
      backgroundImage,
      mapSize,
      mapEl,
      sendMessage
    };
  }
});
</script>
