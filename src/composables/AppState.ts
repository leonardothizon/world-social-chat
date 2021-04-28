import { ref } from 'vue';
import Place from '@/types/Place';

export const useAppState = function (): any {
  const places: Place[] = [
    {
      code: 'NY',
      name: 'New York',
      img: '/img/places/ny.jpg'
    },
    {
      code: 'RJ',
      name: 'Rio de Janeiro',
      img: '/img/places/rio.jpg'
    },
    {
      code: 'LD',
      name: 'London',
      img: '/img/places/london.jpg'
    },
    {
      code: 'PR',
      name: 'Paris',
      img: '/img/places/paris.jpeg',
      map: 'img/maps/paris-map.jpg'
    },
    {
      code: 'AM',
      name: 'Amsterdam',
      img: '/img/places/amsterdam.jpg'
    }
  ];

  const appTitle = ref('World Chat');

  const setAppTitle = (value: string) => {
    appTitle.value = value;
  }

  return { appTitle, setAppTitle, places };
};

export default useAppState;
