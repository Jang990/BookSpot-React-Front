interface Props {
  badgeBorder: string;
  badgeColor: string;
  badgeText: string;
}

const TextLabelBadge = ({ badgeBorder, badgeColor, badgeText }: Props) => {
  return (
    <span
      className={`px-1 py-[1px] rounded-full border-2 ${badgeBorder} ${badgeColor}`}
    >
      {badgeText}
    </span>
  );
};

interface TextProps {
  text: string;
}

export const GreenBadge = ({ text }: TextProps) => {
  return (
    <TextLabelBadge
      badgeText={text}
      badgeBorder="border-green-200"
      badgeColor="bg-green-100 text-green-700"
    />
  );
};

export const RedBadge = ({ text }: TextProps) => {
  return (
    <TextLabelBadge
      badgeText={text}
      badgeBorder="border-red-200"
      badgeColor="bg-red-100 text-red-700"
    />
  );
};

export const YellowBadge = ({ text }: TextProps) => {
  return (
    <TextLabelBadge
      badgeText={text}
      badgeBorder="border-yellow-200"
      badgeColor="bg-yellow-100 text-yellow-700"
    />
  );
};

export const GrayBadge = ({ text }: TextProps) => {
  return (
    <TextLabelBadge
      badgeText={text}
      badgeBorder="border-gray-200"
      badgeColor="bg-gray-100 text-gray-700"
    />
  );
};
