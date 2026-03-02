const commonClasses = "cursor-pointertransition-all disabled:opacity-10 disabled:cursor-not-allowed px-3 py-2 text-black";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination-container flex items-center rounded-full overflow-hidden">
            <button
                className={`${commonClasses}`}
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-3 py-2 cursor-pointer  ${page === currentPage
                        ? "text-black font-black"
                        : "text-black/30"
                        }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className={`${commonClasses}`}
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;