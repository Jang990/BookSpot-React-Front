interface LabelProps {
  text: string;
}

export const CardTitleLabel = ({ text }: LabelProps) => {
  return <h2 className="text-lg font-semibold text-card-foreground">{text}</h2>;
};

export const CardSubLabel = ({ text }: LabelProps) => {
  return <span className="text-sm text-muted-foreground">{text}</span>;
};

export const CardFooterLabel = ({ text }: LabelProps) => {
  return <span className="text-xs text-muted-foreground">{text}</span>;
};
