interface Props {
  label: string;
}

export const CornerBadge = ({ label }: Props) => {
  return (
    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
      {label}
    </span>
  );
};
