import { Button } from "@nextui-org/react";

const OrganizationRegistration = ({ setPathComponent, accountId }) => {
  return (
    <div>
      <Button onClick={() => setPathComponent("path")}>Back</Button>
      OrganizationRegistration
    </div>
  );
};

export default OrganizationRegistration;
