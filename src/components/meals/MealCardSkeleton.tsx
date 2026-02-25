export const MealCardSkeleton = () => {
  return (
    <div className="rounded-lg p-4 w-full animate-pulse">
      <div className="bg-black/15 h-32 w-full mb-4 rounded"></div>
      <div className="h-6 bg-black/15 rounded mb-2"></div>
    </div>
  );
};