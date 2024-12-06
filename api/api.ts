import cities from './cities.json';
import classifications from './classifications.json';

export function getCities(filter: string) {
  const lowerFilter = filter.toLocaleLowerCase();
  return cities
    .filter(({ name }) => name.toLocaleLowerCase().startsWith(lowerFilter))
    .map(({ name, id }) => ({
      value: id,
      label: `${name}`,
    }));
}

export const categoryList = classifications._embedded.classifications
  .filter((item) => item?.segment) // Filter out items without segment
  .map((item) => ({
    id: item.segment!.id,
    name: item.segment!.name,
  }));
