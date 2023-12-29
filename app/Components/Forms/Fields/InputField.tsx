import { Input } from "@nextui-org/react";

interface IInputField {
  type?: string;
  label: string;
  placeholder?: string;
  value?: string;
  isRequired?: boolean;
  className?: string;
  disabled?: boolean;
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
      radius="sm"
      variant="bordered"
      labelPlacement="outside"
      type={type}
      label={label}
      placeholder={placeholder}
      {...register}
      {...rest}
    />
  );
};

export default InputField;
