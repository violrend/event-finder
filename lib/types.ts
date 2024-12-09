import { DateRange } from 'react-day-picker';

export type FilterType = {
  city: string;
  category: string;
  dateRange: DateRange | undefined;
};

export type SearchParamsType = {
  city?: string;
  category?: string;
  startDateTime?: string;
  endDateTime?: string;
};

export type EventType = {
  id: string;
  name: string;
  url: string;
  images: string[];
  date: {
    localDate: string;
    localTime: string;
  };
  segment: {
    id: string;
    name: string;
  };
  genre: {
    id: string;
    name: string;
  };
  venue: string;
  city: string;
  address: string;
  attractions: {
    id: string;
    name: string;
    images: string[];
  }[];
};

export type ApiDataType = {
  id: string;
  name: string;
  url: string;
  images: { url: string }[];
  dates: { start: { localDate: string; localTime: string } };
  classifications: {
    segment: { id: string; name: string };
    genre: { id: string; name: string };
  }[];
  _embedded: {
    venues: {
      name: string;
      city: { name: string };
      address: { line1: string };
    }[];
    attractions: { id: string; name: string; images: { url: string }[] }[];
  };
};

export type EventSummaryType = {
  id: string;
  name: string;
  date: string;
  category: string;
  venue: string;
  image: string;
};