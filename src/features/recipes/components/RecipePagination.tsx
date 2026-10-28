import { useLocation } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type RecipePaginationProps = {
  currentPage: number;
  totalPages: number;
  disabled?: boolean;
  isChangingPage?: boolean;
  onPageChange: (page: number) => void;
};

export function RecipePagination({
  currentPage,
  totalPages,
  disabled = false,
  isChangingPage = false,
  onPageChange,
}: RecipePaginationProps) {
  const location = useLocation();

  const currentUrl =
    location.pathname + location.search + location.hash;

  if (!Number.isInteger(totalPages) || totalPages <= 1) {
    return null;
  }

  const previousDisabled = disabled || currentPage <= 1;
  const nextDisabled = disabled || currentPage >= totalPages;

  const rangeStart = Math.max(
    1,
    Math.min(currentPage - 2, totalPages - 4),
  );

  const visiblePages =
    totalPages <= 7
      ? Array.from({ length: totalPages }, (_, index) => index + 1)
      : Array.from(
          new Set([
            1,
            ...Array.from(
              { length: 5 },
              (_, index) => rangeStart + index,
            ),
            totalPages,
          ]),
        ).sort((a, b) => a - b);

  const paginationItems: (number | string)[] = [];

  visiblePages.forEach((page, index) => {
    const previousPage = visiblePages[index - 1];

    if (previousPage !== undefined && page - previousPage > 1) {
      paginationItems.push(`ellipsis-${previousPage}`);
    }

    paginationItems.push(page);
  });

  return (
    <div className="mt-8">
      <Pagination aria-label="Recipe pagination">
        <PaginationContent className="flex-wrap justify-center gap-1">
          <PaginationItem>
            <PaginationPrevious
              to={currentUrl}
              aria-disabled={previousDisabled}
              tabIndex={previousDisabled ? -1 : undefined}
              onClick={(event) => {
                event.preventDefault();

                if (!previousDisabled) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={`rounded-lg ${
                previousDisabled
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-orange-50 hover:text-orange-600"
              }`}
            />
          </PaginationItem>

          {paginationItems.map((item) =>
            typeof item === "string" ? (
              <PaginationItem key={item}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  to={currentUrl}
                  isActive={currentPage === item}
                  aria-label={`Go to page ${item}`}
                  aria-current={
                    currentPage === item ? "page" : undefined
                  }
                  aria-disabled={disabled}
                  tabIndex={disabled ? -1 : undefined}
                  onClick={(event) => {
                    event.preventDefault();

                    if (!disabled) {
                      onPageChange(item);
                    }
                  }}
                  className={`size-9 rounded-lg text-sm transition-colors ${
                    currentPage === item
                      ? "border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:text-white"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  } ${
                    disabled ? "pointer-events-none opacity-40" : ""
                  }`}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              to={currentUrl}
              aria-disabled={nextDisabled}
              tabIndex={nextDisabled ? -1 : undefined}
              onClick={(event) => {
                event.preventDefault();

                if (!nextDisabled) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={`rounded-lg ${
                nextDisabled
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-orange-50 hover:text-orange-600"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <p
        role="status"
        className="mt-3 text-center text-xs text-gray-500"
      >
        {isChangingPage
          ? "Loading selected page..."
          : `Page ${currentPage} of ${totalPages}`}
      </p>
    </div>
  );
}