import { ReactNode, ButtonHTMLAttributes, memo } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  bgColor?: string;
}

export const Button = memo((props: ButtonProps) => {
  const {
    children,
    bgColor = "bg-violet-700",
    ...otherProps
  } = props;

  return (
    <button
      className={`px-4 py-2 text-white font-semibold rounded-md hover:bg-violet-900 transition duration-300 ${bgColor}`}
      {...otherProps}
    >
      {children}
    </button>
  );
});
