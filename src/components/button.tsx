type Props = {
  className?: string;
};

export const Button = (props: Props) => {
  return (
    <button className="relative flex items-center justify-center space-x-2 px-4 py-2 bg-gray-primary hover:bg-gray-300 rounded-md border-b-4 border-gray-400 active:border-b-0 active:translate-y-1 shadow-lg text-black-primary font-bold">
      Play with Home
    </button>
  );
};
