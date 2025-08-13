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
    <div className="relative">
      {/* 펄스 효과 - 완료 시에만 표시 */}
      {availableCount === totalCount && totalCount > 0 && (
        <div className="absolute inset-0 w-10 h-10 rounded-full bg-green-400 animate-ping opacity-75"></div>
      )}

      {/* 메인 아이콘 */}
      <div
        className={`
      relative w-10 h-10 rounded-full flex items-center justify-center shadow-md
      text-xs font-bold transition-all duration-300
      ${(() => {
        const ratio = totalCount > 0 ? availableCount / totalCount : 0;
        const isComplete = availableCount === totalCount && totalCount > 0;

        if (isComplete) {
          // 완료 시 - 펄스는 별도 div에서 처리
          return "bg-green-500 text-white";
        } else if (ratio >= 0.8) {
          return "bg-green-400 text-white";
        } else if (ratio >= 0.6) {
          return "bg-yellow-400 text-white";
        } else if (ratio >= 0.4) {
          return "bg-orange-400 text-white";
        } else if (ratio > 0) {
          return "bg-red-400 text-white";
        } else {
          return "bg-gray-300 text-gray-600";
        }
      })()}
    `}
      >
        {availableCount} / {totalCount}
      </div>
    </div>
  );
};
