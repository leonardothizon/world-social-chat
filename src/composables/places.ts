import Place from "@/types/Place";

const usePlaces = function(): any {

    const places: Place[] = [
        {
          code: 'NY',
          name: 'New York'
        },
        {
          code: 'RJ',
          name: 'Rio de Janeiro'
        },
        {
          code: 'LD',
          name: 'London'
        },
        {
          code: 'PR',
          name: 'Paris'
        }
      ];

      return { places };

};

export default usePlaces;
