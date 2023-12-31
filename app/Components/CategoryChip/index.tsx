import { Chip } from "@nextui-org/react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export type Category = "chat" | "email";

const CategoryChip = ({ category }: { category: Category }) => {
  switch (category) {
    case "chat":
      return (
        <Chip
          variant="dot"
          color="primary"
          startContent={<IoChatbubbleEllipsesOutline />}
        >
          <p className="text-md-500">Chat</p>
        </Chip>
      );
    default:
      return (
        <Chip startContent={<MdEmail />} variant="dot" color="secondary">
          <p className="text-md-500">Email</p>
        </Chip>
      );
  }
};

export default CategoryChip;
