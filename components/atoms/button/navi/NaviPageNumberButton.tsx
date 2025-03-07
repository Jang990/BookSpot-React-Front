interface NaviPageNumber {
  page: number;
  onClick: () => void;
  clicked: boolean;
}

export const NaviPageNumberButton = ({
  page,
  onClick,
  clicked,
}: NaviPageNumber) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md ${
        clicked ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
      }`}
    >
      {page}
    </button>
  );
};
