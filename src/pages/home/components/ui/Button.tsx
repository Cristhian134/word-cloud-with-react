import clsx from "clsx";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 py-2 text-white rounded transition-all duration-200",
        {
          "bg-blue-300 cursor-not-allowed": disabled,
          "bg-blue-500 hover:bg-blue-600 cursor-pointer": !disabled,
        },
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
