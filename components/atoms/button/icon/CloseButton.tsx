import { X } from "lucide-react";

interface Props {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="text-muted-foreground hover:text-foreground animate-in zoom-in-50 duration-200"
    >
      <X size={24} />
    </button>
  );
};
