import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Link from "next/link";

export default function ProfileInfo({ user }) {
  return (
    <Tabs variant="underlined" aria-label="Options" className="px-4">
      <Tab key="resume" title="Resume">
        <div className="tab-wrapper px-8">
          <Link
            target="_blank"
            href={user.document_url}
            className="text-[#2C5CC5]"
          >
            View Resume
          </Link>
        </div>
      </Tab>
    </Tabs>
  );
}
