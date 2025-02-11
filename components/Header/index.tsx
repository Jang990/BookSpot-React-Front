"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useBookCart } from "@/contexts/BookCartContext";
import { GoToCartButton } from "../atoms/button/GoToCartButton";

export default function Header() {
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

  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return "";
      case "/cart":
        return "북카트";
      case "/libraries":
        return "소장 도서관";
      default:
        if (pathname.startsWith("/book/")) {
          return "책 정보";
        }
        return "???";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-sm" : "bg-background"}`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          BookSpot
        </Link>
        <h1 className="text-xl font-semibold text-primary">{getPageTitle()}</h1>
        <GoToCartButton />
      </div>
    </header>
  );
}
