import { Home } from "lucide-react";

export const HomePrimaryButton = () => {
  return (
    <>
      <a
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-white hover:bg-primary-dark transition"
      >
        <Home /> 홈으로
      </a>
    </>
  );
};
