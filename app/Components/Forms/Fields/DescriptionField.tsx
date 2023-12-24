import { Textarea } from "@nextui-org/react";
import React from "react";

interface IDescriptionField {
  label: string;
  placeholder: string;
}

const DescriptionField = ({ label, placeholder, register, ...rest }: any) => {
  return (
    <Textarea
      label={label}
      labelPlacement="outside"
      variant="bordered"
      size="lg"
      radius="sm"
      minRows={50}
      placeholder={placeholder}
      {...register}
      {...rest}
    />
  );
};

export default DescriptionField;
