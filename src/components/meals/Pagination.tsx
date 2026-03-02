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
        <div className="pagination-container flex items-center bg-black/15 backdrop-blur-md rounded-full overflow-hidden">
            <button
                className="px-3 py-2 bg-black text-white disabled:bg-transparent disabled:text-black/10 disabled:cursor-not-allowed"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-3 py-2 cursor-pointer  ${page === currentPage
                        ? "text-black"
                        : "text-black/50"
                        }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className="px-3 py-2 bg-black/5 text-black disabled:opacity-20"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;