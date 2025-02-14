interface ReviewProps {
  author: string;
  content: string;
  rating: number;
  date: string;
}

export default function Review({ author, content, rating, date }: ReviewProps) {
  return (
    <div className="bg-card shadow rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-semibold">{author}</h4>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <p className="text-gray-600 mb-2">{content}</p>
      <p className="text-sm text-gray-400">{date}</p>
    </div>
  );
}
