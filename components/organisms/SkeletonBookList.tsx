import { SkeletonBookCard } from "./book/preview/SkeletonBookCard";

interface Props {
  count?: number;
}

export const SkeletonBookList = ({ count = 6 }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {/* 스켈레톤 컴포넌트를 원하는 개수만큼 반복 출력 */}
      {[...Array(count)].map((_, i) => (
        <SkeletonBookCard key={i} />
      ))}
    </div>
  );
};
