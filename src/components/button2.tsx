import clsx from "clsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "filled" | "outline";
  loading?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "filled",
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "px-4 h-10 py-2 rounded-md transition-colors duration-300 font-medium text-sm w-full text-center",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "filled",
          "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white":
            variant === "outline",
          "opacity-50 cursor-not-allowed": loading || disabled,
        },
        className
      )}
      disabled={loading || disabled}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <AiOutlineLoading3Quarters className="animate-spin h-4 w-4 mr-2" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};
