"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { InfoToast } from "@/components/molecules/toast/InfoToast";

// Toast 메시지의 타입 정의
type ToastType = "INFO" | "WARN";

// Context가 제공할 값들의 타입 정의
interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

// Context 생성 (기본값 설정)
const ToastContext = createContext<ToastContextType>({
  showToast: () => {}, // 기본값은 아무것도 하지 않는 함수
});

// 다른 컴포넌트에서 쉽게 Context를 사용할 수 있도록 도와주는 커스텀 훅
export const useToast = () => useContext(ToastContext);

// Toast 상태를 실제로 관리하고, UI를 렌더링하는 Provider 컴포넌트
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  // 3초 후에 토스트가 자동으로 사라지도록 설정
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
    }
  }, [toast]);

  // 토스트를 보여주는 함수
  const showToast = (message: string, type: ToastType = "INFO") => {
    setToast({ message, type });
  };

  const handleClose = () => {
    setToast(null);
  };

  const value = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* toast 상태가 있을 때만 화면에 InfoToast 컴포넌트를 렌더링 */}
      {toast && (
        <InfoToast
          message={toast.message}
          type={toast.type}
          onClose={handleClose}
        />
      )}
    </ToastContext.Provider>
  );
};
