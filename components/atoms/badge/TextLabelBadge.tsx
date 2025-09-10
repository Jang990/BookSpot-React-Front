import React from "react";

interface Props {
  badgeBorder: string;
  badgeColor: string;
  badgeText: string;
  icon?: React.ReactNode;
}

const TextLabelBadge = ({
  badgeBorder,
  badgeColor,
  badgeText,
  icon,
}: Props) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-1 py-[1px] rounded-full border-2 text-xs ${badgeBorder} ${badgeColor}`}
    >
      {icon &&
        React.cloneElement(icon as React.ReactElement, {
          className: "w-3 h-3 shrink-0",
        })}
      {badgeText}
    </span>
  );
};

interface BadgeProps {
  text: string;
  icon?: React.ReactNode;
}

export const GreenBadge = ({ text, icon }: BadgeProps) => {
  return (
    <TextLabelBadge
      badgeText={text}
      badgeBorder="border-green-200"
      badgeColor="bg-green-100 text-green-700"
      icon={icon}
    />
  );
};

export const RedBadge = ({ text, icon }: BadgeProps) => {
  return (
    <TextLabelBadge
      badgeText={text}
      badgeBorder="border-red-200"
      badgeColor="bg-red-100 text-red-700"
      icon={icon}
    />
  );
};

export const YellowBadge = ({ text, icon }: BadgeProps) => {
  return (
    <TextLabelBadge
      badgeText={text}
      badgeBorder="border-yellow-200"
      badgeColor="bg-yellow-100 text-yellow-700"
      icon={icon}
    />
  );
};

export const GrayBadge = ({ text, icon }: BadgeProps) => {
  return (
    <TextLabelBadge
      badgeText={text}
      badgeBorder="border-gray-200"
      badgeColor="bg-gray-100 text-gray-700"
      icon={icon}
    />
  );
};
