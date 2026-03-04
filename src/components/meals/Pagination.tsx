import { getVisiblePages } from "@/lib/utils";

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    if (totalPages <= 1) return null;

    const commonClasses =
        "cursor-pointer transition-all disabled:opacity-10 bg-black/60 disabled:cursor-not-allowed px-3 py-2 text-white";

    const visiblePages = getVisiblePages(currentPage, totalPages);

    return (
        <div className="pagination-container flex items-center rounded-full overflow-hidden">
            <button
                className={commonClasses}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            {visiblePages.map((page, index) =>
                page === "dots" ? (
                    <span key={`dots-${index}`} className="px-3 py-2 text-black/40">
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        className={`px-3 py-2 cursor-pointer ${page === currentPage
                            ? "text-black font-black"
                            : "text-black/30"
                            }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                className={commonClasses}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};