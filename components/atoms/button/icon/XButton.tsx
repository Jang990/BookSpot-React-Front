import { X } from "lucide-react";

interface Props {
  onClick: () => void;
}

export const XButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-muted-foreground hover:text-foreground animate-in zoom-in-50 duration-200"
    >
      <X size={24} />
    </button>
  );
};
