import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationType, SearchParamsType } from '@/lib/types';

export const EventPagination = async ({
  pagination,
  searchParams,
}: {
  pagination: PaginationType;
  searchParams: SearchParamsType;
}) => {
  const { currentPage, totalPages } = pagination;
  const { city, category, startDateTime, endDateTime } = await searchParams;

  const newSearchParams = new URLSearchParams();
  if (city) newSearchParams.set('city', city);
  if (category) newSearchParams.set('category', category);
  if (startDateTime) newSearchParams.set('startDateTime', startDateTime);
  if (endDateTime) newSearchParams.set('endDateTime', endDateTime);

  const baseUrl = `/events?${newSearchParams.toString()}`;

  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      // Show all pages if total is 7 or less
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(0);
      
      if (currentPage > 2) {
        pages.push(-1); // Ellipsis
      }
      
      // Show current page and surrounding pages
      for (let i = Math.max(1, currentPage - 1); 
           i <= Math.min(currentPage+1, totalPages - 2); i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 3) {
        pages.push(-1); // Ellipsis
      }
      
      // Always show last page
      pages.push(totalPages - 1);
    }
    
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        
        {/* Previous page */}
        {currentPage > 0 && (
          <PaginationItem>
            <PaginationPrevious href={`${baseUrl}&page=${currentPage - 1}`} />
          </PaginationItem>
        )}

        {/* Page numbers */}
        {getPageNumbers().map((pageNumber, index) => (
          <PaginationItem key={index}>
            {pageNumber === -1 ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={pageNumber === currentPage ? '#' : `${baseUrl}&page=${pageNumber}`}
                isActive={pageNumber === currentPage}
              >
                {pageNumber + 1}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next page */}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationNext href={`${baseUrl}&page=${currentPage + 1}`} />
          </PaginationItem>
        )}

       
      </PaginationContent>
    </Pagination>
  );
};

export default EventPagination;
