"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookSpotLogoButton } from "../atoms/BookSpotLogoLink";
import { BagIconLink } from "../molecules/link/BagIconLink";
import { useBag } from "@/contexts/BagContext";
import { UserCircle } from "lucide-react";
import IconDropDownButton from "./dropdown/IconDrowDown";
import { signOut, useSession } from "next-auth/react";
import { REDIRECT_QUERY_STRING_KEY } from "@/utils/querystring/RedirectUri";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { bag } = useBag();

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
        <div className="flex items-center gap-3">
          <BagIconLink href="/cart" cartSize={bag.length} />

          <UserIconButton />
        </div>
      </div>
    </header>
  );
};

const UserIconButton = () => {
  const { status } = useSession();
  const router = useRouter();

  return (
    <>
      {status === "authenticated" ? (
        <IconDropDownButton
          Icon={UserCircle}
          items={[
            { type: "link", text: "내 서재", href: "/library" },
            {
              type: "button",
              text: "로그아웃",
              onClick: () => signOut(),
            },
          ]}
        />
      ) : (
        <button
          type="button"
          aria-haspopup="menu"
          onClick={() => {
            const { pathname, search } = window.location;
            const currentUri = pathname + search;
            router.push(
              `/login?${REDIRECT_QUERY_STRING_KEY}=${encodeURIComponent(currentUri)}`
            );
          }}
          className={`inline-flex items-center justify-center p-2 rounded-full transition-transform duration-150 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-transparent`}
          title="로그인"
        >
          <UserCircle size={24} className="text-muted-foreground" />
        </button>
      )}
    </>
  );
};
