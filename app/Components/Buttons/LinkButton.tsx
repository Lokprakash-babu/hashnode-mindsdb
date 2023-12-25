import { Link, Button } from "@nextui-org/react";

interface ILinkButton {
  target: string;
  ctaLabel: string;
  anchorIcon?: null | JSX.Element;
}
const LinkButton = ({
  target = "/",
  ctaLabel = "Submit",
  anchorIcon = null,
}: ILinkButton) => {
  return (
    <Button
      className="rounded-md border-[#12344D] !opacity-100 text-white bg-primary-btn-gradient min-w-[120px] min-h-8 px-6 py-1.5 hover:!bg-[#12334C] hover:opacity-100 active:!opacity-100"
      href={target}
      as={Link}
      variant="solid"
    >
      <div className="btn-content-wrapper flex items-center text-sm font-medium gap-1.5">
        {anchorIcon && <span>{anchorIcon}</span>}
        {ctaLabel}
      </div>
    </Button>
  );
};

export default LinkButton;