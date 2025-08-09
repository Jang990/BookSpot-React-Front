import { XButton } from "@/components/atoms/button/icon/XButton";
import { CardTitleLabel } from "@/components/atoms/label/CardLabel";

interface PopupHeaderProps {
  headerName: string;
  onClose: () => void;
}

export const PopupHeader = ({
  headerName,
  onClose: onClosed,
}: PopupHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <CardTitleLabel text={headerName} />
      <XButton onClick={onClosed} />
    </div>
  );
};
