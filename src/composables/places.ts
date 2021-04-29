import Place from '@/types/Place';

const usePlaces = function (): any {
  const places: Place[] = [
    {
      code: 'NY',
      name: 'New York',
      img: '/img/places/ny.jpg'
    },
    {
      code: 'RJ',
      name: 'Rio de Janeiro',
      img: '/img/places/rio.jpg',
      map: 'img/maps/rio-map.jpeg',
      mapWidth: 2561,
      mapHeight: 1903,
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
      map: 'img/maps/paris-map.jpg',
      mapWidth: 2199,
      mapHeight: 1415,
    },
    {
      code: 'AM',
      name: 'Amsterdam',
      img: '/img/places/amsterdam.jpg'
    }
  ];

  return { places };
};

export default usePlaces;
