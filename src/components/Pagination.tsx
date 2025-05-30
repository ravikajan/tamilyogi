import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPaginationRange(page: number, totalPages: number, delta = 1) {
  // Always show first, last, current, and neighbors
  const range: (number | string)[] = [];
  const left = Math.max(2, page - delta);
  const right = Math.min(totalPages - 1, page + delta);

  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < totalPages - 1) range.push("...");
  if (totalPages > 1) range.push(totalPages);
  return range;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const range = getPaginationRange(page, totalPages);

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        className="pagination-btn px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      {range.map((item, idx) =>
        typeof item === "number" ? (
          <button
            key={item}
            className={`pagination-btn px-4 py-2 rounded-lg font-medium ${
              page === item
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => onPageChange(item)}
            disabled={page === item}
          >
            {item}
          </button>
        ) : (
          <span key={"ellipsis-" + idx} className="px-2 py-2 text-gray-500">
            ...
          </span>
        )
      )}
      <button
        className="pagination-btn px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
