import { Info } from "lucide-react";

interface Props {
  text: string;
}

export const InfoPanel = ({ text }: Props) => {
  return (
    <div className="mt-4 flex items-center justify-center">
      <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
        <Info size={16} className="flex-shrink-0" />
        <span className="text-center">{text}</span>
      </div>
    </div>
  );
};
