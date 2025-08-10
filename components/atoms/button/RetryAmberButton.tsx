import { RotateCw } from "lucide-react";

export const RetryAmberButton = () => {
  return (
    <>
      <button
        onClick={() => {
          window.location.reload();
        }}
        className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-6 py-3 text-white hover:bg-amber-600 transition"
      >
        <RotateCw /> 재시도
      </button>
    </>
  );
};
