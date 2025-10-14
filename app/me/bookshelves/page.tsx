import { auth } from "@/auth";
import { UserBookshelvesListTemplate } from "@/components/templates/UserBookshelvesListTemplate";
import { fetchUserBookshelvesSummary } from "@/utils/api/BookshelfApi";
import { createRedirectLoginUrl } from "@/utils/querystring/RedirectUri";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BookshelvesPage() {
  const session = await auth();

  if (!session?.user) {
    redirect(createRedirectLoginUrl("/me/bookshelves"));
  }

  const shelves = (
    await fetchUserBookshelvesSummary({
      userId: session.user.id,
      side: "server",
    })
  ).bookshelvesSummary;

  return (
    <UserBookshelvesListTemplate
      shelves={shelves}
    ></UserBookshelvesListTemplate>
  );
}
