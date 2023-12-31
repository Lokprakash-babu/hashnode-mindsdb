import { requestWrapper } from "@/lib/requestWrapper";
import { useEffect, useState } from "react";
import { Tabs, Tab, Avatar } from "@nextui-org/react";
const OrgInfo = ({ user }) => {
  const [org, setOrg] = useState(null);
  useEffect(() => {
    requestWrapper(`organisation/${user.organisation_id}`).then((data) => {
      setOrg(data?.organisation);
    });
  }, [user]);

  return (
    <Tabs variant="underlined" aria-label="Options" className="px-4">
      <Tab key="org" title="Organisation">
        <div className="tab-wrapper px-8">
          <div className="org-card px-2.5 py-4 rounded-lg bg-[#E6F0FE] border border-[#C5E0FD] before:bg-[#2E66D0] before:border-brand before:rounded-full w-[350px] flex gap-x-3 items-center">
            <Avatar name={org?.name} />
            <h1 className="header-2-600">{org?.name}</h1>
          </div>
        </div>
      </Tab>
    </Tabs>
  );
};

export default OrgInfo;
