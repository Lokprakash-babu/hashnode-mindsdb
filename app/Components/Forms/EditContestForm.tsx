"use client";
import { requestWrapper } from "@/lib/requestWrapper";
import { toast } from "react-toastify";
import Toast from "../Toasts/Toast";
import { useForm } from "react-hook-form";
import { CATEGORY_DATA } from "./CreateContestForm";
import SingleSelect from "./Fields/SingleSelect";
import DateFormatter from "@/app/utils/dateFormatter";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const EditContestForm = ({ details }) => {
  const methods = useForm({
    mode: "onSubmit",
  });
  const router = useRouter();
  const onSubmitHandler = async (data: any) => {
    try {
      await requestWrapper(`contest/${details.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      toast.success("Contest updated successfuly");
      router.push(window.location.href);
      router.refresh();
    } catch {
      toast.error("Unable to update Contest!");
    }
  };
  <Toast />;
  return (
    <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
      <div className="form-wrapper flex flex-col gap-y-8">
        <Input
          isRequired
          {...methods.register("title", {
            required: true,
          })}
          defaultValue={details.title}
          label="Title"
          name="title"
          placeholder="Enter your contest title"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
        />
        <SingleSelect
          isRequired={true}
          register={methods.register("category", {
            required: true,
          })}
          defaultSelectedKeys={[details.category]}
          label="Category"
          value={CATEGORY_DATA}
          name="category"
          data={CATEGORY_DATA}
        />

        <Input
          isRequired
          type="date"
          {...methods.register("start_date", {
            required: true,
          })}
          defaultValue={DateFormatter(details.start_date)}
          label="Start Date"
          name="start_date"
          placeholder="Enter your contest title"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
        />

        <Input
          {...methods.register("end_date", {
            required: true,
          })}
          isRequired={true}
          defaultValue={DateFormatter(details.end_date)}
          type="date"
          label="End Date"
          name="end_date"
          placeholder="Enter your contest end date"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
        />

        <Input
          {...methods.register("role", {
            required: true,
          })}
          defaultValue={details.role}
          label="Role"
          name="role"
          placeholder="Enter the role you are hiring"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
        />
        <Button
          className="rounded-md  border-[#12344D] !opacity-100 text-white bg-primary-btn-gradient min-w-[120px] min-h-8 px-6 py-1.5 hover:!bg-[#12334C] hover:opacity-100 active:!opacity-100"
          type="submit"
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditContestForm;
