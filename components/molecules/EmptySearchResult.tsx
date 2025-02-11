import { Search } from "lucide-react";

export const EmptySearchResult = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <Search size={64} className="text-muted-foreground mb-4" />
      <p className="text-xl text-muted-foreground">검색 결과가 없습니다.</p>
    </div>
  );
};
