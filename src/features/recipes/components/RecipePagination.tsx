
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type RecipePaginationProps = {
  page: number;
  totalPages: number;
  getPageUrl: (page: number) => string;
};

export function RecipePagination({
  page,
  totalPages,
  getPageUrl,
}: RecipePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            to={getPageUrl(Math.max(1, page - 1))}
            aria-disabled={isFirstPage}
            tabIndex={isFirstPage ? -1 : undefined}
            className={
              isFirstPage
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>

        {/* Page numbers */}
        {Array.from(
          { length: totalPages },
          (_, index) => index + 1,
        ).map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              to={getPageUrl(pageNumber)}
              isActive={page === pageNumber}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            to={getPageUrl(
              Math.min(totalPages, page + 1),
            )}
            aria-disabled={isLastPage}
            tabIndex={isLastPage ? -1 : undefined}
            className={
              isLastPage
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
