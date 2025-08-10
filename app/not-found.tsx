import { HomePrimaryButton } from "@/components/atoms/button/HomePrimaryButton";
import { ErrorImage } from "@/components/atoms/ErrorImage";

export default async function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center">
      <ErrorImage src="/404.svg" alt="404" />
      <div>
        <h1 className="mt-2 text-2xl font-bold text-gray-800">
          페이지를 찾을 수 없어요.
        </h1>
        <div className="mt-4 flex justify-center gap-4">
          <HomePrimaryButton />
        </div>
      </div>
    </div>
  );
}
