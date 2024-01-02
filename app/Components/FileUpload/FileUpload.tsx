import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginPdfPreview from "filepond-plugin-pdf-preview";
import "filepond/dist/filepond.min.css";
registerPlugin(FilePondPluginPdfPreview);
import { useState } from "react";
const create = (file, setFileUrl) => {
  const pdfFile = file[0];
  if (pdfFile) {
    const formData = new FormData();
    formData.append("file", pdfFile?.file);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`
    );
    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then(
      (data) => {
        data.json().then((response) => {
          setFileUrl(response.url);
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
};
const FileUpload = ({
  label = "Resume",
  setFileUrl,
  showLabel = true,
  disabled = false,
  initialFile = [],
}) => {
  const [file, setFile] = useState(initialFile);
  return (
    <div className="flex flex-col gap-y-2">
      {showLabel && <label>Resume</label>}
      <FilePond
        files={file}
        disabled={disabled}
        credits={false}
        allowReorder={true}
        allowMultiple={false}
        onupdatefiles={(data) => {
          !disabled && create(data, setFileUrl);
          // @ts-ignore
          setFile(data);
        }}
        labelIdle={
          disabled
            ? ""
            : `Drag & Drop your ${label} or <span class="filepond--label-action">Browse</span>`
        }
      />
    </div>
  );
};

export default FileUpload;
