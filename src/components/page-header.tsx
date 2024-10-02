type Props = {
  title: string;
  description?: string;
};

export const PageHeader = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-extrabold">{title}</h1>
      <p className=" text-base font-light">{description}</p>
    </div>
  );
};
