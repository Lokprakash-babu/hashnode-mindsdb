"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SubmissionList from "./SubmissionListing";

export default function SubmissionListingTab() {
  const searchParam = useSearchParams();
  const pageType = searchParam.get("type");
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState("Practice");

  useEffect(() => {
    if (!pageType || (pageType !== "practice" && pageType !== "contest")) {
      router.push(`${pathname}?type=practice`);
    }
  }, [pathname]);
  return (
    <Tabs
      aria-label="Submission Options"
      selectedKey={selected}
      //@ts-ignore
      onSelectionChange={(value) => {
        //@ts-ignore
        setSelected(value);
        router.push(`${pathname}?type=${value}`);
      }}
      className="mt-8"
    >
      <Tab key="practice" title="Practice">
        <SubmissionList type={"practice"} />
      </Tab>
      <Tab key="contest" title="Contest">
        <SubmissionList type={"contest"} />
      </Tab>
    </Tabs>
  );
}
