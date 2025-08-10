"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // console.error(error.message);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center">
      <img
        src="/5xx.svg"
        alt="5xx"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        style={{ aspectRatio: "1 / 1" }}
      />
      <div>
        <h1 className="mt-2 text-2xl font-bold text-gray-800">
          서버에 문제가 발생했어요.
        </h1>
        <h2 className="mt-2 font-bold text-gray-800">
          잠시 후 다시 시도해주세요.
        </h2>
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
