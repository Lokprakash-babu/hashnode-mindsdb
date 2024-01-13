"use client";
import { requestWrapper } from "@/lib/requestWrapper";
import { toast } from "react-toastify";
import Toast from "../Toasts/Toast";
import { useForm } from "react-hook-form";
import { CATEGORY_DATA } from "./CreateContestForm";
import SingleSelect from "./Fields/SingleSelect";
import DateFormatter from "@/app/utils/dateFormatter";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Button from "../Buttons";
import moment from "moment";

const EditContestForm = ({ details, disableForm = false }) => {
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
        body: JSON.stringify({
          ...data,
          end_date: moment(data.end_date).unix(),
          start_date: moment(data.start_date).unix(),
        }),
      });
      toast.success("Contest updated successfuly");
      setTimeout(() => {
        router.push(window.location.href);
        router.refresh();
      }, 750);
    } catch {
      toast.error("Unable to update Contest!");
    }
  };
  // <Toast />;
  return (
    <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
      <div className="form-wrapper flex flex-col gap-y-8">
        <Input
          isDisabled={disableForm}
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
          isDisabled={disableForm}
          isRequired={true}
          register={methods.register("role", {
            required: true,
          })}
          defaultSelectedKeys={[details.role]}
          label="Role"
          value={CATEGORY_DATA}
          name="role"
          data={CATEGORY_DATA}
        />

        <Input
          isRequired
          isDisabled={disableForm}
          type="date"
          {...methods.register("start_date", {
            required: true,
          })}
          defaultValue={moment.unix(details.start_date).format("YYYY-MM-DD")}
          label="Start Date"
          name="start_date"
          placeholder="Enter your contest title"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
        />

        <Input
          isDisabled={disableForm}
          {...methods.register("end_date", {
            required: true,
          })}
          isRequired={true}
          defaultValue={moment.unix(details.end_date).format("YYYY-MM-DD")}
          type="date"
          label="End Date"
          name="end_date"
          placeholder="Enter your contest end date"
          radius="sm"
          variant="bordered"
          labelPlacement="outside"
        />

        <Button isDisabled={disableForm} type="submit" color="primary">
          Update
        </Button>
      </div>
    </form>
  );
};

export default EditContestForm;
