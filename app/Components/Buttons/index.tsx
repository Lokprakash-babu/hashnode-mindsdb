"use client";
import { extendVariants, Button as NextUIButton } from "@nextui-org/react";

const Button = extendVariants(NextUIButton, {
  variants: {
    // <- modify/add variants
    color: {
      primary:
        "text-white bg-primary-btn-gradient border-[#12344D] opacity-100 hover:!bg-[#12334C] hover:opacity-100 active:opacity-100",
      secondary: "bg-white text-black rounded-md border-[2px] border-[#C9D3DB]",
      danger: "bg-[#C82124] text-white",
    },
    isDisabled: {
      true: "opacity-50 cursor-not-allowed",
    },
    size: {
      xl: "rounded-md min-w-[120px] min-h-8 px-6 py-1.5 ",
    },
  },
  defaultVariants: {
    // <- modify/add default variants
    color: "primary",
    size: "xl",
  },
  compoundVariants: [
    // <- modify/add compound variants
    {
      isDisabled: true,
      color: "primary",
      class: "opacity-80",
    },
  ],
});

export default Button;
