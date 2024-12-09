
'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'

type RemovableFilterBadgeProps = {
  filterKey: string
  filterValue: string
}

export function RemovableFilterBadge({ filterKey, filterValue }: RemovableFilterBadgeProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRemove = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    if (filterKey === 'daterange') {
      newSearchParams.delete('startDateTime')
      newSearchParams.delete('endDateTime')
    } else {
      newSearchParams.delete(filterKey)
    }
    router.push(`/events?${newSearchParams.toString()}`)
  }

  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <button onClick={handleRemove} className="p-0 h-4 w-4 rounded-full hover:bg-muted-foreground/20">
        <X className="h-3 w-3" />
      </button>
      {filterValue}
    </Badge>
  )
}

