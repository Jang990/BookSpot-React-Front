import { NearbyLibraryStock } from "@/types/NearbyLibraryStock";

interface LibraryInfoProps {
  libraryStock: NearbyLibraryStock;
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
            거리: {libraryStock.library.distanceMeter.toFixed(1)}m
          </p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {libraryStock.availableBooks.length} /{" "}
          {libraryStock.unavailableBooks.length}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">소장 도서:</h3>
        <ul className="list-disc list-inside">
          {libraryStock.availableBooks.map((book) => (
            <li key={book.bookId} className="text-green-600">
              {book.title}
            </li>
          ))}
          {libraryStock.unavailableBooks.map((book) => (
            <li key={book.bookId} className="text-green-600">
              {book.title}
            </li>
          ))}
          {/* {selectedBooks.map((book) => (
            <li
              key={book.id}
              className={
                library.books.includes(book.id)
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {book.title}
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}
