"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  id: number;
  name: string;
}

interface CategoryNavigationProps {
  breadcrumbs: BreadcrumbItem[];
  onBreadcrumbClick: (index: number) => void;
}

export function CategoryNavigation({
  breadcrumbs,
  onBreadcrumbClick,
}: CategoryNavigationProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.id} className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBreadcrumbClick(index - 1)}
            className="h-auto p-1 text-sm hover:text-foreground"
          >
            {breadcrumb.name}
          </Button>
          {index < breadcrumbs.length - 1 && (
            <ChevronRight className="w-4 h-4" />
          )}
        </div>
      ))}
    </div>
  );
}
