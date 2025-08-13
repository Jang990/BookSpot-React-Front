import { HomePrimaryButton } from "../atoms/button/HomePrimaryButton";
import { RetryAmberButton } from "../atoms/button/RetryAmberButton";
import { ErrorImage } from "../atoms/ErrorImage";

export const ErrorPageTemplate = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center">
      <ErrorImage src="/5xx.svg" alt="5xx" />
      <div>
        <h1 className="mt-2 text-2xl font-bold text-gray-800">
          서버에 문제가 발생했어요.
        </h1>
        <h2 className="mt-2 font-bold text-gray-800">
          잠시 후 다시 시도해주세요.
        </h2>

        <div className="mt-4 flex justify-center gap-4">
          <HomePrimaryButton />
          <RetryAmberButton />
        </div>
      </div>
    </div>
  );
};
