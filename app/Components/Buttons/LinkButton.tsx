import { Link } from "@nextui-org/react";

import clsx from "clsx";
import Button from ".";
interface ILinkButton {
  target: string;
  ctaLabel: string;
  anchorIcon?: null | JSX.Element;
  className?: string;
}
const LinkButton = ({
  target = "/",
  ctaLabel = "Submit",
  anchorIcon = null,
  className = "",
}: ILinkButton) => {
  return (
    <Button className={clsx(className)} href={target} as={Link} variant="solid">
      <div className="btn-content-wrapper flex items-center text-sm font-medium gap-1.5">
        {anchorIcon && <span>{anchorIcon}</span>}
        {ctaLabel}
      </div>
    </Button>
  );
};

export default LinkButton;
