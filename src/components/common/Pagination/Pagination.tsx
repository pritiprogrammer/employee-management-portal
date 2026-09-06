import "./Pagination.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
   onPageChange,

}: PaginationProps) {
  return (
<div className="pagination">
  <button
    disabled={currentPage === 1}
    onClick={onPrevious}
  >
    Previous
  </button>

<div className="pagination-pages">
  {Array.from(
    { length: Math.min(totalPages, 7) },
    (_, index) => {
      const page = index + 1;

      return (
        <button
          key={page}
          type="button"
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      );
    },
  )}
</div>

  <button
    disabled={currentPage === totalPages}
    onClick={onNext}
  >
    Next
  </button>
</div>
  );
}

export default Pagination;