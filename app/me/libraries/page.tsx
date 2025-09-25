import { HomePrimaryButton } from "@/components/atoms/button/HomePrimaryButton";
import { ErrorImage } from "@/components/atoms/ErrorImage";

export default async function MyLibraries() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center">
      <ErrorImage src="/404.svg" alt="404" />
      <div>
        <h1 className="mt-2 text-2xl font-bold text-gray-800">
          개발 중인 페이지에요. 9월 안으로 추가될 수 있게 노력할게요.
        </h1>
        <div className="mt-4 flex justify-center gap-4">
          <HomePrimaryButton />
        </div>
      </div>
    </div>
  );
}
