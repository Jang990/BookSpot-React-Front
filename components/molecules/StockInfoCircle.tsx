interface Props {
  isHighlighted: boolean;
  availableCount: number;
  totalCount: number;
}
export const StockInfoCircle = ({
  isHighlighted,
  availableCount,
  totalCount,
}: Props) => {
  return (
    <div
      className={`
              w-10 h-10 rounded-full flex items-center justify-center shadow-md
              text-xs font-bold transition-all duration-300
              ${isHighlighted ? "bg-primary text-white" : "bg-white text-primary"}
            `}
    >
      {availableCount} / {totalCount}
    </div>
  );
};
