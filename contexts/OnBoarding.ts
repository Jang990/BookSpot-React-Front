"use client";

import { useState, useEffect } from "react";

const ONBOARDING_COOKIE_NAME = "bookspot-onboarding-completed";

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasCompleted =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith(ONBOARDING_COOKIE_NAME))
        ?.split("=")[1] === "true";

    if (!hasCompleted) {
      setShowOnboarding(true);
    }
    setIsLoading(false);
  }, []);

  const completeOnboarding = () => {
    // Set cookie to expire in 1 year
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    document.cookie = `${ONBOARDING_COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/`;
    setShowOnboarding(false);
  };

  const closeOnboarding = () => {
    setShowOnboarding(false);
  };

  const resetOnboarding = () => {
    document.cookie = `${ONBOARDING_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    setShowOnboarding(true);
  };

  return {
    showOnboarding,
    isLoading,
    completeOnboarding,
    closeOnboarding,
    resetOnboarding,
  };
}
