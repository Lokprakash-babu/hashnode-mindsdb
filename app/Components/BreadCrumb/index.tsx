"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export interface IBreadCrumbItem {
  label: string;
  href: string;
}
export interface IBreadCrumb {
  crumbs: IBreadCrumbItem[];
  variant?: "bordered" | "solid" | "light";
}

const BreadCrumb = ({ crumbs, variant = "bordered" }: IBreadCrumb) => {
  return (
    <Breadcrumbs variant={variant} color="primary" underline="always">
      {crumbs.map((crumb) => {
        return (
          <BreadcrumbItem href={crumb.href} key={crumb.label}>
            {crumb.label}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
