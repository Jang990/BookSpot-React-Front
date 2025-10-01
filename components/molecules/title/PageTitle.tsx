import { Button } from "@/components/ui/button";
import React from "react";

interface Props {
  text: string;
}

const Title = ({ title }: { title: string }) => {
  return (
    <h1 className="text-2xl font-semibold text-gray-800 select-none">
      {title}
    </h1>
  );
};

const SubLabel = ({ subLabel }: { subLabel: string }) => {
  return <p className="text-muted-foreground">{subLabel}</p>;
};

export const PageTitle = ({ text }: Props) => {
  return (
    <div className="p-4 pb-5">
      <Title title={text} />
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
    <div>
      <div className="mb-1">
        <Title title={title} />
      </div>
      <SubLabel subLabel={subLabel} />
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
      <div className="pe-3">
        <SubLabel subLabel={label} />
      </div>
    </div>
  );
};

interface TitleAndButtonProps {
  title: string;
  subLabel?: string;
  btnIcon?: React.ReactNode;
  btnDisabled: boolean;
  onClickBtn: () => void;
}

export const PageTitleAndButton = ({
  title,
  subLabel,

  btnDisabled,
  btnIcon,
  onClickBtn,
}: TitleAndButtonProps) => {
  return (
    <div className="p-4">
      <div className="flex items-end justify-between">
        {subLabel ? (
          <TitleAndSubLabel title={title} subLabel={subLabel} />
        ) : (
          <Title title={title} />
        )}

        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClickBtn}
            disabled={btnDisabled}
          >
            {btnIcon}
          </Button>
        </div>
      </div>
    </div>
  );
};
