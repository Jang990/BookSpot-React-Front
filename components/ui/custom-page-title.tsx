import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

// --- 1. 기본 레이아웃 스타일 정의 ---
const pageHeaderVariants = cva(
  "flex w-full items-center justify-between gap-4 p-4"
);

// --- 2. 메인 컨테이너 컴포넌트 ---
interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(pageHeaderVariants({ className }))}
      {...props}
    />
  )
);
PageHeader.displayName = "PageHeader";

// --- 3. 부품(Part) 컴포넌트들 ---

interface PageHeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  onBackClick?: () => void; // 뒤로가기 버튼 클릭 이벤트
  children: React.ReactNode;
}

const PageHeaderTitle = React.forwardRef<HTMLDivElement, PageHeaderTitleProps>(
  ({ className, onBackClick, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {onBackClick && (
        <button
          type="button"
          onClick={onBackClick}
          className="-ml-2 p-2 rounded-full hover:bg-accent transition-colors"
          aria-label="뒤로 가기"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}
      <h1 className="select-none text-2xl font-semibold text-gray-800">
        {children}
      </h1>
    </div>
  )
);
PageHeaderTitle.displayName = "PageHeader.Title";

// 서브 라벨
const PageHeaderSubLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-muted-foreground", className)} {...props} />
));
PageHeaderSubLabel.displayName = "PageHeader.SubLabel";

// 제목과 서브라벨을 세로로 묶는 그룹
const PageHeaderGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("grid gap-1", className)} {...props} />
));
PageHeaderGroup.displayName = "PageHeader.Group";

// 버튼이나 링크 등이 들어갈 오른쪽 영역
const PageHeaderActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-shrink-0 items-center gap-2", className)}
    {...props}
  />
));
PageHeaderActions.displayName = "PageHeader.Actions";

// --- 4. 내보내기 ---
export {
  PageHeader,
  PageHeaderTitle,
  PageHeaderSubLabel,
  PageHeaderGroup,
  PageHeaderActions,
};
