"use client";

import { ErrorPageTemplate } from "@/components/templates/ErrorPageTemplate";
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

  return <ErrorPageTemplate />;
}
