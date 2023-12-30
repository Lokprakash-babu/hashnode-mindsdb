import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import InputField from "./Fields/InputField";
import Phone from "../Icons/Phone";
import SingleSelect from "./Fields/SingleSelect";
import { CountryList } from "@/app/constants/countries";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import { requestWrapper } from "@/lib/requestWrapper";

const AccountRegistrationForm = ({
  accountId,
  type = "candidate",
  currentOrg = null,
}) => {
  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
  });
  const isCandidate = type === "candidate";
  const router = useRouter();
  const onSubmitHandler = (data) => {
    const updateData = {
      ...data,
      account_type: type,
      organisation_id: currentOrg,
    };
    requestWrapper(`account/${accountId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }).then(
      () => {
        router.refresh();
        toast.success("Information updated successfuly");
      },
      () => {
        toast.error("Unable to update the information");
      }
    );
  };
  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="form-wrapper flex flex-col gap-y-6">
        <InputField
          type="text"
          label="Phone Number"
          isRequired={true}
          register={register("phone_number", {
            required: true,
          })}
          startContent={<Phone />}
        />
        {isCandidate && (
          <InputField
            type="text"
            label="Area of interest"
            register={register("area_of_interest", {
              required: true,
            })}
            placeholder="Enter your interests"
          />
        )}
        <InputField
          type="text"
          label="Experience in years"
          register={register("experience", {
            required: true,
          })}
          placeholder="Enter your experience"
        />
        <SingleSelect
          isRequired={true}
          register={register("country", {
            required: true,
          })}
          placeholder="Select a country"
          label="Country"
          value={CountryList}
          name="country"
          data={CountryList}
        />
      </div>
      <div className="footer flex justify-end">
        <Button
          className="rounded-md  border-[#12344D] !opacity-100 text-white bg-primary-btn-gradient min-w-[120px] min-h-8 px-6 py-1.5 hover:!bg-[#12334C] hover:opacity-100 active:!opacity-100"
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default AccountRegistrationForm;
