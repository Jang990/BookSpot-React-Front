"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BookSpotLogoButton } from "../atoms/BookSpotLogoLink";
import { CartIconLink } from "../molecules/link/CartIconLink";
import { useBookCart } from "@/contexts/BookCartContext";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { cart } = useBookCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-sm" : "bg-background"}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <BookSpotLogoButton />
        <CartIconLink href="/cart" cartSize={cart.length} />
      </div>
    </header>
  );
};
