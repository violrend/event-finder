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

export const categories = [
  { value: 'KZFzniwnSyZfZ7v7nJ', label: 'Music' },
  { value: "KZFzniwnSyZfZ7v7nE", label: 'Sports' },
  { value: 'KZFzniwnSyZfZ7v7na', label: 'Arts & Theatre' },
  { value: 'KZFzniwnSyZfZ7v7nn', label: 'Film' },
  { value: '[KZFzniwnSyZfZ7v7n1, KZFzniwnSyZfZ7v7nl]', label: 'Other' },
];
