"use client";

import { ErrorPage } from "@/components/molecules/ErrorPage";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // console.error(error.message);
  }, [error]);

  return <ErrorPage />;
}
