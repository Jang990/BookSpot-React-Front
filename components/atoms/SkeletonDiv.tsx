interface SkeletonDivProps {
  width?: string; // ex: "w-24"
  height?: string; // ex: "h-10"
}

export const SkeletonDiv = ({
  width = "w-28",
  height = "h-5",
}: SkeletonDivProps) => {
  return (
    <div className="pe-3">
      <div
        className={`${height} ${width} bg-gray-300 rounded animate-pulse`}
      ></div>
    </div>
  );
};
