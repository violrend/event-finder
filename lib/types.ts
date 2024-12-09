import { DateRange } from 'react-day-picker'

export type FilterType = {
  city: string
  category: string
  dateRange: DateRange | undefined
}

export type SearchParamsType = {
  city?: string
  category?: string
  startDateTime?: string
  endDateTime?: string
}