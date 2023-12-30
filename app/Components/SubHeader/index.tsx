import clsx from "clsx";

const SubHeader = ({ children, className = "" }) => {
  return (
    <div className={clsx("sub-header py-5 pl-[90px] bg-white", className)}>
      {children}
    </div>
  );
};

export default SubHeader;
