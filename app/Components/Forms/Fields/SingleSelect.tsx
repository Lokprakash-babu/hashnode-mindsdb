import { Select, SelectItem } from "@nextui-org/react";

interface IItem {
  value: string;
  label: string;
}

const SingleSelect = ({ data, label, register, ...rest }: any) => {
  return (
    <Select
      radius="sm"
      labelPlacement="outside"
      variant="bordered"
      placeholder="Choose your contest category"
      label={label}
      {...register}
      {...rest}
    >
      {data.map((item: IItem) => (
        <SelectItem className="text-black" key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SingleSelect;
