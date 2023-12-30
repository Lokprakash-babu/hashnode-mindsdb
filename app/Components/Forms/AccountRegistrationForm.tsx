import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import InputField from "./Fields/InputField";
import Phone from "../Icons/Phone";
import SingleSelect from "./Fields/SingleSelect";
import { CountryList } from "@/app/constants/countries";
import { toast } from "react-toastify";
import { requestWrapper } from "@/lib/requestWrapper";
import Button from "../Buttons";

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
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default AccountRegistrationForm;
