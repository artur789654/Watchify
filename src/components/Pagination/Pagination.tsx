import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxPages = 500;
  const effectiveTotalPages = Math.min(totalPages, maxPages);
  

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < effectiveTotalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const pages: number[] = [];

    pages.push(1);

    if (currentPage > 4) {
      pages.push(-1);
    }

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(currentPage + 2, effectiveTotalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < effectiveTotalPages - 3) {
      pages.push(-1);
    }

    if (totalPages > 1) {
      pages.push(effectiveTotalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center space-x-1 mt-6">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="text-sm md:text-base md:px-4 md:py-2 px-2 py-1 transition-bg duration-300 bg-dark-text-main dark:bg-light-text-main hover:bg-dark-text-secondary dark:hover:bg-light-text-secondary shadow-md rounded-md disabled:bg-light-secondary dark:disabled:bg-dark-secondary">
        <MdOutlineNavigateBefore/>
      </button>
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === -1 ? (
            <span className="text-sm xl:text-base xl:px-4 md:py-2 px-0 py-1">...</span>
          ) : (
            <button
              onClick={() => handlePageClick(page)}
              className={`text-sm md:text-base md:px-4 md:py-2 px-2 py-1 rounded-md transition-bg duration-300 ${
                page === currentPage ? "bg-dark-text-secondary dark:bg-light-text-secondary text-white" : "bg-light-head-foot dark:bg-dark-head-foot hover:bg-dark-text-secondary dark:hover:bg-light-text-secondary"
              }`}>
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === effectiveTotalPages}
        className="text-sm md:text-base md:px-4 md:py-2 px-2 py-1 transition-bg duration-300 bg-dark-text-main dark:bg-light-text-main hover:bg-dark-text-secondary dark:hover:bg-light-text-secondary shadow-md rounded-md disabled:bg-light-secondary dark:disabled:bg-dark-secondary">
        <MdNavigateNext/>
      </button>
    </div>
  );
};

export default Pagination;
