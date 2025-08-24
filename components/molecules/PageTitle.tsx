interface Props {
  text: string;
}

export const PageTitle = ({ text }: Props) => {
  return (
    <div className="p-4 pb-5">
      <h1 className="text-2xl font-semibold text-gray-800 select-none">
        {text}
      </h1>
    </div>
  );
};

interface TitleAndLabel {
  title: string;
  label: string;
}

export const PageTitlAndSubLabel = ({ title, label }: TitleAndLabel) => {
  return (
    <div className="flex justify-between items-center">
      <PageTitle text={title} />
      <div className="text-muted-foreground pe-3">{label}</div>
    </div>
  );
};
