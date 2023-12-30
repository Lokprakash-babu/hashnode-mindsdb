"use client";
import PDFViewer from "pdf-viewer-reactjs";
import RegisterPath from "./Components/Onboarding/RegisterPath";
import useAccountContext from "./hooks/useAccountContext";
export default function Home() {
  const { account_type, id } = useAccountContext();
  return !account_type ? (
    <RegisterPath accountId={id} />
  ) : (
    <PDFViewer
      document={{
        url: "http://res.cloudinary.com/dbxc3pyvn/image/upload/v1703928823/hashnode-mindsb/mwl10fmnd9zh3gastdcv.pdf",
      }}
    />
  );
}
