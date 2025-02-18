export async function get(api: string) {
  return await fetch(api, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok");
  });
}
