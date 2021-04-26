import Place from "@/types/Place";

const usePlaces = function(): any {

    const places: Place[] = [
        {
          code: 'NY',
          name: 'New York',
          img: '/img/places/ny.jpg',
        },
        {
          code: 'RJ',
          name: 'Rio de Janeiro',
          img: '/img/places/rio.jpg',
        },
        {
          code: 'LD',
          name: 'London',
          img: '/img/places/london.jpg',
        },
        {
          code: 'PR',
          name: 'Paris',
          img: '/img/places/paris.jpeg',
        },
        {
          code: 'AM',
          name: 'Amsterdam',
          img: '/img/places/amsterdam.jpg',
        },
      ];

      return { places };

};

export default usePlaces;
