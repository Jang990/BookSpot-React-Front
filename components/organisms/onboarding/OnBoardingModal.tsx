"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { useOnboarding } from "@/contexts/OnBoarding";

interface OnBoardinStep {
  id: number;
  title: string;
  image: string;
  description?: string[];
}

const steps: OnBoardinStep[] = [
  {
    id: 1,
    title: "읽고 싶은 책을 찾으세요",
    image: "/onboarding/onboarding-1.webp",
    description: [
      "검색 결과가 많다면 정확도순으로 확인해보세요",
      "검색어와 일치하는 책을 먼저 보여드릴게요",
    ],
  },
  {
    id: 2,
    title: "책 사진을 클릭하고, 위치를 찾으세요",
    image: "/onboarding/onboarding-2.webp",
    description: [
      "'저장하기'로 여러 책 위치를 한 번에 확인하세요",
      "저장된 책은 우측 상단 아이콘에서 볼 수 있어요",
    ],
  },
  {
    id: 3,
    title: "소장하고 있는 도서관을 찾아보세요",
    image: "/onboarding/onboarding-3.webp",
    description: ["대출 현황을 확인할 수 있게 연결해 드릴게요"],
  },
];

export function OnboardingModal() {
  const { showOnboarding, completeOnboarding, closeOnboarding } =
    useOnboarding();

  const isOpen = showOnboarding;
  const onClose = closeOnboarding;
  const onComplete = completeOnboarding;

  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card border-border">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">
              BookSpot 시작하기
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-2 transition-colors ${index < currentStep ? "bg-primary" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="text-center mb-4">
            <img
              src={currentStepData.image || "/placeholder.svg"}
              alt={currentStepData.title}
              className="h-80 object-contain rounded-lg mb-4 mx-auto bg-muted"
            />

            <h3 className="text-lg font-semibold text-foreground mb-2">
              {currentStepData.title}
            </h3>
            {currentStepData.description?.map((desc, idx) => (
              <p
                key={idx}
                className="text-muted-foreground text-sm leading-relaxed"
              >
                {desc}
              </p>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="text-muted-foreground bg-transparent"
                >
                  이전
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                건너뛰기
              </Button>
              <Button
                onClick={handleNext}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {currentStep === steps.length - 1 ? "시작하기" : "다음"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
