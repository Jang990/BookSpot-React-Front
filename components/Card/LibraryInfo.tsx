import type { Library } from "@/types/Library";
import type { Book } from "@/types/Book";

interface LibraryInfoProps {
  library: Library;
  selectedBooks: Book[];
}

export default function LibraryInfo({
  library,
  selectedBooks,
}: LibraryInfoProps) {
  const availableBooks = selectedBooks.filter((book) =>
    library.books.includes(book.id)
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{library.name}</h2>
          <p className="text-gray-600">거리: {library.distance.toFixed(1)}km</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {availableBooks.length} / {selectedBooks.length}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">소장 도서:</h3>
        <ul className="list-disc list-inside">
          {selectedBooks.map((book) => (
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
          ))}
        </ul>
      </div>
    </div>
  );
}
