export const fetchBooksDetail = async (bookId: string) => {
  const api: string = "http://localhost:8080/api/books/".concat(bookId);
  return await fetch(api, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok");
  });
};
