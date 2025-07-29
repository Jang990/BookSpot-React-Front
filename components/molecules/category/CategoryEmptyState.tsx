interface CategoryEmptyStateProps {
  searchTerm: string;
}

export function CategoryEmptyState({ searchTerm }: CategoryEmptyStateProps) {
  return (
    <div className="text-center py-8 text-muted-foreground">
      {searchTerm ? "검색 결과가 없습니다." : "하위 카테고리가 없습니다."}
    </div>
  );
}
