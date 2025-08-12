export const SkeletonBookCard = () => {
  return (
    <div className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* 이미지 자리 */}
      <div className="h-64 bg-gray-300" />

      {/* 내용 자리 */}
      <div className="p-4 space-y-3">
        {/* 제목 */}
        <div className="h-6 bg-gray-400 rounded w-3/4" />
        {/* 저자/출판사 */}
        <div className="h-4 bg-gray-400 rounded w-1/2" />
        {/* 연도 및 정보 */}
        <div className="h-4 bg-gray-400 rounded w-1/3" />

        {/* 대출 횟수 아이콘과 텍스트 */}
        <div className="flex items-center space-x-2 mt-2">
          <div className="h-5 w-5 bg-gray-400 rounded" />
          <div className="h-4 bg-gray-400 rounded w-20" />
        </div>
      </div>
    </div>
  );
};
