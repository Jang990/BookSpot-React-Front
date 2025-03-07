interface NaviOptionProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

export const NaviOptionButton = ({
  text,
  onClick,
  disabled,
}: NaviOptionProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 rounded-md ${
        disabled
          ? "text-gray-400 cursor-not-allowed"
          : "text-primary hover:bg-primary/10"
      }`}
    >
      {text}
    </button>
  );
};
