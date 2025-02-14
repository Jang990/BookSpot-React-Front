interface Props {
  onClick: () => void;
}

export const GpsConfirmButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors animate-in zoom-in-50 duration-200"
    >
      위치 확인
    </button>
  );
};
