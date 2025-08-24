interface RankingBadgeProps {
  rank: number;
}

export const RankingBadge = ({ rank }: RankingBadgeProps) => {
  const getBadgeStyle = (rank: number) => {
    if (rank === 1) {
      return {
        bg: "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600",
        text: "text-white",
        border: "border-yellow-300",
        shadow: "shadow-2xl shadow-yellow-400/50",
        glow: "drop-shadow-lg",
        icon: "👑",
      };
    } else if (rank === 2) {
      return {
        bg: "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-500",
        text: "text-white",
        border: "border-gray-200",
        shadow: "shadow-2xl shadow-gray-300/50",
        glow: "drop-shadow-lg",
        icon: "🥈",
      };
    } else if (rank === 3) {
      return {
        bg: "bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800",
        text: "text-white",
        border: "border-amber-300",
        shadow: "shadow-2xl shadow-amber-500/50",
        glow: "drop-shadow-lg",
        icon: "🥉",
      };
    } else if (rank <= 30) {
      return {
        bg: "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700",
        text: "text-white",
        border: "border-blue-300",
        shadow: "shadow-xl shadow-blue-400/40",
        glow: "drop-shadow-md",
        icon: "⭐",
      };
    } else {
      return {
        bg: "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700",
        text: "text-white",
        border: "border-orange-300",
        shadow: "shadow-xl shadow-orange-400/40",
        glow: "drop-shadow-md",
        icon: "🎖️",
      };
    }
  };

  const style = getBadgeStyle(rank);

  return (
    <div
      className={`absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-1 rounded-full border-2 ${style.bg} ${style.text} ${style.border} ${style.shadow} ${style.glow} text-xs font-bold`}
    >
      <span className="text-xs">{style.icon}</span>
      <span>#{rank}</span>
    </div>
  );
};
