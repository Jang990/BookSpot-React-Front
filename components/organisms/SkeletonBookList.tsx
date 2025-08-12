import { SkeletonBookCard } from "./book/preview/SkeletonBookCard";

export const SkeletonBookList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {/* 스켈레톤 컴포넌트를 원하는 개수만큼 반복 출력 */}
      {[...Array(6)].map((_, i) => (
        <SkeletonBookCard key={i} />
      ))}
    </div>
  );
};
