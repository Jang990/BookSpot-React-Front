import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  text: string;
}

export const PageTitle = ({ text }: Props) => {
  return (
    <div className="p-4 pb-5">
      <h1 className="text-2xl font-semibold text-gray-800 select-none">
        {text}
      </h1>
    </div>
  );
};

export const TitleAndSubLabel = ({
  title,
  subLabel,
}: {
  title: string;
  subLabel: string;
}) => {
  return (
    <div className="p-4 pb-5">
      <h1 className="text-2xl font-semibold text-gray-800 select-none mb-2">
        {title}
      </h1>
      <p className="text-muted-foreground">{subLabel}</p>
    </div>
  );
};

interface TitleAndLabel {
  title: string;
  label: string;
}

export const PageTitlAndSubLabel = ({ title, label }: TitleAndLabel) => {
  return (
    <div className="flex justify-between items-center">
      <PageTitle text={title} />
      <div className="text-muted-foreground pe-3">{label}</div>
    </div>
  );
};

interface TitleAndButtonProps {
  title: string;
  subLabel?: string;
  btnText: string;
  btnIcon?: React.ReactNode;
  btnDisabled: boolean;
  onClickBtn: () => void;
}

export const PageTitleAndButton = ({
  title,
  subLabel,

  btnText,
  btnDisabled,
  btnIcon,
  onClickBtn,
}: TitleAndButtonProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {subLabel ? (
        <TitleAndSubLabel title={title} subLabel={subLabel} />
      ) : (
        <PageTitle text={title} />
      )}

      <Button
        disabled={btnDisabled}
        onClick={() => onClickBtn()}
        className="flex items-center gap-2 me-2"
      >
        {btnIcon}
        {btnText}
      </Button>
    </div>
  );
};
