"use client";

import { useState, useEffect } from "react";
import LibraryInfo from "@/components/organisms/LibraryInfo";
import { fetchNearByLibraryStock } from "@/utils/api/LibraryStockSearchApi";
import { useSearchParams } from "next/navigation";
import { NearbyLibraryStock } from "@/types/NearbyLibraryStock";

export default function LibraryPage() {
  const [libraries, setLibraries] = useState<NearbyLibraryStock[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const bookIdsStr = searchParams.get("bookIds");
    const bookIds = bookIdsStr ? bookIdsStr.split(",") : [];
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lng = parseFloat(searchParams.get("lng") || "0");
    fetchNearByLibraryStock({
      bookIds: bookIds,
      location: {
        latitude: lat,
        longitude: lng,
      },
    });

    fetchNearByLibraryStock({
      bookIds: bookIds,
      location: {
        latitude: lat,
        longitude: lng,
      },
    }).then((libraries) => setLibraries(libraries));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        {libraries.map((library) => (
          <LibraryInfo key={library.library.libraryId} libraryStock={library} />
        ))}
      </div>
    </div>
  );
}
