"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// 💡 두 모듈을 네임스페이스로 가져와 이름 충돌을 방지합니다.
import * as BagCookie from "@/utils/BagLocalStorage";
import * as BagApi from "@/utils/api/BagApi";

type BagContextType = {
  bag: string[];
  isLoading: boolean; // 💡 초기 데이터 로딩 상태 추가
  clearBag: () => Promise<boolean>;
  addToBag: (bookId: string) => Promise<boolean>;
  removeFromBag: (bookId: string) => Promise<boolean>;
};

const BagContext = createContext<BagContextType | undefined>(undefined);

export const useBag = () => {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
};

type BagProviderProps = { children: React.ReactNode };

export const BagProvider = ({ children }: BagProviderProps) => {
  const { data: session, status } = useSession(); // 💡 NextAuth의 세션 훅
  const [bag, setBag] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 💡 로그인 상태(status)가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    const initializeBag = async () => {
      setIsLoading(true);
      try {
        if (status === "authenticated") {
          // 🙋‍♂️ 로그인 상태: API를 통해 데이터를 가져옵니다.
          const items = await BagApi.findBookIds();
          console.log(items);
          setBag(items);
        } else if (status === "unauthenticated") {
          // 👤 비로그인 상태: 쿠키에서 데이터를 가져옵니다.
          const items = await BagCookie.findBookIds();
          setBag(items);
        }
        // "loading" 상태일 때는 아무것도 하지 않고 대기합니다.
      } catch (error) {
        console.error("Failed to initialize bag:", error);
        setBag([]); // 에러 발생 시 가방을 비웁니다.
      } finally {
        setIsLoading(false);
      }
    };

    if (status !== "loading") {
      initializeBag();
    }
  }, [status]); // status가 바뀔 때마다 이 로직이 다시 실행됩니다.

  const clearBag = async (): Promise<boolean> => {
    const isSuccess = session ? await BagApi.clear() : await BagCookie.clear();

    if (isSuccess) setBag([]);
    return isSuccess;
  };

  const addToBag = async (targetId: string): Promise<boolean> => {
    const isSuccess = session
      ? await BagApi.addBookId(targetId)
      : await BagCookie.addBookId(targetId);

    if (isSuccess) {
      setBag((prev) => [...prev, targetId]);
    }
    return isSuccess;
  };

  const removeFromBag = async (targetId: string): Promise<boolean> => {
    const isSuccess = session
      ? await BagApi.removeBookId(targetId)
      : await BagCookie.removeBookId(targetId);

    if (isSuccess) {
      setBag((prev) => prev.filter((id) => id !== targetId));
    }
    return isSuccess;
  };

  return (
    <BagContext.Provider
      value={{
        bag,
        isLoading,
        clearBag,
        addToBag,
        removeFromBag,
      }}
    >
      {children}
    </BagContext.Provider>
  );
};
