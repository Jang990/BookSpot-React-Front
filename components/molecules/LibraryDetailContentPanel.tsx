"use client";

import { ExternalLink, Clock, Calendar } from "lucide-react";
import { Library } from "@/types/Library";

interface LibraryStockPanelProps {
  library: Library;
  selectButton?: React.ReactNode;
}

export const LibraryDetailContentPanel = ({
  library,
  selectButton,
}: LibraryStockPanelProps) => {
  return (
    <>
      <div className="space-y-2.5">
        <div className="flex items-start text-sm text-gray-600">
          <span className="mr-2 text-primary flex-shrink-0 mt-0.5">📍</span>
          <span className="text-sm">{library.address}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <ExternalLink size={14} className="mr-2 text-primary flex-shrink-0" />
          <a
            href={library.homePage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm"
          >
            홈페이지 방문하기
          </a>
        </div>

        <div className="flex items-start text-sm text-gray-600">
          <Clock size={14} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
          <span className="text-sm">{library.operatingInfo}</span>
        </div>

        <div className="flex items-start text-sm text-gray-600">
          <Calendar
            size={14}
            className="mr-2 text-primary flex-shrink-0 mt-0.5"
          />
          <span className="text-sm">휴관일: {library.closedInfo}</span>
        </div>
        {selectButton && <>{selectButton}</>}
      </div>
    </>
  );
};
