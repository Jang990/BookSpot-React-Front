export default async function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center">
      <img
        src="/404.svg"
        alt="404"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        style={{ aspectRatio: "1 / 1" }}
      />
      <div>
        <h1 className="mt-2 text-2xl font-bold text-gray-800">
          페이지를 찾을 수 없어요.
        </h1>
        <a
          href="/"
          className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-white hover:bg-primary-dark transition"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}
