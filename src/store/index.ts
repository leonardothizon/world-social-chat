import { createStore } from 'vuex';

export interface Message {
  text: string;
  timestamp: Date;
  timeAsString?: string;
}
export interface User {
  id: string;
  img: string;
  messages: Message[];
  position: {
    x: number;
    y: number;
  };
}
export interface State {
  appTitle: string;
  currentUserId: string;
  users: User[];
}

export default createStore<State>({
  state() {
    return {
      appTitle: 'World Chat',
      currentUserId: 'leonardothizon',
      users: [
        {
          id: 'leonardothizon',
          img: '/img/profile.jpg',
          messages: [],
          position: { x: 150, y: 150 }
        },
        {
          id: 'anndoe',
          img: '/img/profile2.jpg',
          messages: [],
          position: { x: 230, y: 175 }
        },
        {
          id: 'johndoe',
          img: '/img/profile3.jpg',
          messages: [],
          position: { x: 190, y: 420 }
        }
      ]
    };
  },
  mutations: {
    setAppTitle(state: State, title: string) {
      state.appTitle = title;
    },
    addMessageToUser(state: State, {userId, message}: {userId: string, message: Message}) {
      state.users.find(user => user.id === userId)?.messages.push(message);
    }
  }
});
