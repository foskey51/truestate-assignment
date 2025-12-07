export default function Pagination({ page, setPage, pagination }) {
  const { total = 0, totalPages = 1 } = pagination;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-3">
      <button
        onClick={() => canGoPrev && setPage((p) => p - 1)}
        disabled={!canGoPrev}
        className="px-5 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <span className="text-sm text-gray-700">
        Page {page} of {totalPages} ({total} records)
      </span>

      <button
        onClick={() => canGoNext && setPage((p) => p + 1)}
        disabled={!canGoNext}
        className="px-5 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
