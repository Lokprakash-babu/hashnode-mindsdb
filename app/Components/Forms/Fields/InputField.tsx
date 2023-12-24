import { Input } from "@nextui-org/react";
import { ValueOptions } from "postcss/lib/container";
import { RegisterOptions } from "react-hook-form";

interface IInputField {
  type?: string;
  label: string;
  placeholder?: string;
  value?: string;
  isRequired?: boolean;
  className?: string;
  disabled?: boolean;
  register: RegisterOptions<ValueOptions>;
}

const InputField = ({
  type = "text",
  label,
  placeholder,
  register,
  ...rest
}: any) => {
  return (
    <Input
      labelPlacement="outside"
      isRequired
      type={type}
      label={label}
      radius="sm"
      variant="bordered"
      placeholder={placeholder}
      {...register}
      {...rest}
    />
  );
};

export default InputField;
