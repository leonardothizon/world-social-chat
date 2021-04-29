<template>
  <div
    :class="{ 'current-user': isCurrentUser }"
    class="user-profile-image cursor-pointer absolute"    
    ref="userEl"
  >
    <img
      :src="user.img"
      alt="User Image"      
      class="rounded-full w-12 h-12 object-cover border-4 border-gray-300"
    />
    <transition name="fade">
      <p
        class="user-message absolute bg-gray-100 text-purple-800 p-2 rounded flex flex-col gap-1 w-48"
        :class="messagePosition"
        v-if="messageToDisplay"
      >
        <span class="text-sm">{{ messageToDisplay.text }}</span>
        <span class="self-end text-xs opacity-70">{{
          messageToDisplay.timeAsString
        }}</span>
      </p>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
  watch,
  watchEffect
} from 'vue';
import { format } from 'date-fns';
import { Message, User } from '@/store';

export default defineComponent({
  props: {
    user: Object as () => User,
    isCurrentUser: Boolean
  },
  setup(props) {
    const userEl = ref<HTMLElement>();

    const messageToDisplay: Ref<Message | null> = ref(null);
    const messagePosition = ref('top-right');
    const movingMark = ref(false);

    const initialMousePos = reactive({
      x: 0 as number,
      y: 0 as number
    });

    const initialElementPos = reactive({
      x: 0 as number,
      y: 0 as number
    });

    function controlMovement(evt: MouseEvent) {
      if (userEl.value && movingMark.value) {
        const deltaX = evt.clientX - initialMousePos.x;
        const deltaY = evt.clientY - initialMousePos.y;

        const destPositionLeft =
          initialElementPos.x + deltaX > 10 ? initialElementPos.x + deltaX : 10;
        const destPositionTop =
          initialElementPos.y + deltaY > 10 ? initialElementPos.y + deltaY : 10;
        userEl.value.style.left = `${destPositionLeft}px`;
        userEl.value.style.top = `${destPositionTop}px`;
      }
    }

    function controlMouseUp(evt: MouseEvent) {
      movingMark.value = false;
      initialElementPos.x = parseInt(userEl.value?.style?.left || '10');
      initialElementPos.y = parseInt(userEl.value?.style?.top || '10');
      document.removeEventListener('mousemove', controlMovement);
      document.removeEventListener('mouseup', controlMouseUp);
    }

    onMounted(() => {
      if (userEl.value) {
        userEl.value.style.left = (props.user?.position?.x || 50) + 'px';
        userEl.value.style.top = (props.user?.position?.y || 50) + 'px';
      }
      initialElementPos.x = parseInt(userEl.value?.style?.left || '10');
      initialElementPos.y = parseInt(userEl.value?.style?.top || '10');

      if (props.isCurrentUser) {
        userEl.value?.addEventListener('mousedown', (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          console.log('mousedown');
          movingMark.value = true;
          initialMousePos.x = evt.clientX;
          initialMousePos.y = evt.clientY;
          document.addEventListener('mousemove', controlMovement);
          document.addEventListener('mouseup', controlMouseUp);
        });
      }
    });

    const addMessage = (messageToAdd: Message) => {
      messageToAdd.timeAsString = format(messageToAdd.timestamp, 'hh:mm aaa');
      messageToDisplay.value = messageToAdd;
      setTimeout(() => {
        messageToDisplay.value = null;
      }, 3500);
    };

    if (!props.isCurrentUser) {
      setInterval(() => {
        const date = new Date();
        addMessage({
          text: 'Lorem ipsum dolor sit amet',
          timestamp: date,
          timeAsString: format(date, 'hh:mm aaa')
        });
      }, Math.random() * 10000 + 5000);
    }

    watchEffect(() => {
      const messages = props.user?.messages;
      if (messages?.length) {
        const message = messages[messages.length - 1];
        addMessage(message);
      }
    });

    return { userEl, messageToDisplay, messagePosition };
  }
});
</script>

<style lang="scss">
.user-profile-image {
  img {
    box-shadow: 1px 5px 9px 0px rgb(0 0 0 / 75%);
  }
  &.current-user {
    img {
      @apply border-purple-800;
    }
    p {
      @apply text-white;
      @apply bg-purple-800;
    }
  }
}
.bottom-right {
  transform: translateY(10px);
  left: -10px;
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    bottom: 100%;
    left: 2em; // offset should move with padding of parent
    border: 0.45rem solid transparent;
    border-top: none;

    // looks
    border-bottom-color: #5b21b6;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }
}

.top-right {
  transform: translateY(calc(-100% - 10px));
  top: 0;
  left: -10px;
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 100%;
    left: 2em; // offset should move with padding of parent
    border: 0.45rem solid transparent;
    border-bottom: none;

    // looks
    border-top-color: #5b21b6;
    filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
