import { InputHTMLAttributes, memo } from "react";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly"
>;

interface InputProps extends HTMLInputProps {
  value?: string | number;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
}

export const Input = memo((props: InputProps) => {
  const { value, onChange, type, placeholder } = props;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <input
      value={value}
      type={type}
      onChange={onChangeHandler}
      placeholder={placeholder}
      className="w-full p-2 border border-violet-300 rounded-md outline-none focus:border-violet-700"
    />
  );
});