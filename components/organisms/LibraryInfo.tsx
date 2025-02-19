import { NearbyLibraryStock } from "@/types/NearbyLibraryStock";

interface LibraryInfoProps {
  libraryStock: NearbyLibraryStock;
}

function toKm(distanceMeter: number) {
  return ((Math.round(distanceMeter / 10) * 10) / 1000).toFixed(2);
}

export default function LibraryInfo({ libraryStock }: LibraryInfoProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">
            {libraryStock.library.libraryName}
          </h2>
          <p className="text-gray-600">
            거리: {toKm(libraryStock.library.distanceMeter)}Km
          </p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {libraryStock.availableBooksCount} / {libraryStock.bookStocks.length}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">소장 도서:</h3>
        <ul className="list-disc list-inside">
          {libraryStock.bookStocks.map((book) => (
            <li
              key={`${libraryStock.library.libraryId}-${book.id}`}
              className={book.available ? "text-green-600" : "text-red-600"}
            >
              {book.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
