"use client";

import { Input, Textarea } from "@nextui-org/react";
import FormLayout from "./FormLayout";
import { FieldValues, UseFormRegister } from "react-hook-form";
import SingleSelect from "./Fields/SingleSelect";
import InputField from "./Fields/InputField";
import DescriptionField from "./Fields/DescriptionField";

/**
 * Form Fields
 * Contest Id - Auto Generated, Disabled
 * Title
 * Contest description
 * Category [Sales, Customer support, marketing ,product associate]
 * Start Date
 * End Date
 * Questions
 * Organisation Id - hidden
 * status - yet to start
 * Job Description
 */

const CATEGORY_DATA = [
  { label: "Sales", value: "sales" },
  { label: "Customer Support", value: "customer_support" },
  { label: "Marketing", value: "marketing" },
  { label: "Product Associate", value: "product_associate" },
  { label: "User Engineer", value: "user_engineer" },
  { label: "Demo Engineer", value: "demo_engineer" },
];

const ContestForm = (register: UseFormRegister<FieldValues>, errors) => {
  return (
    <div className="form-wrapper flex flex-col gap-y-8">
      <InputField
        type="text"
        value={"CN-0001"}
        label="Challenge Id"
        register={register("id", {
          required: true,
        })}
      />
      <InputField
        register={register("title", {
          required: true,
        })}
        isRequired={true}
        label="Title"
        placeholder="Enter your contest title"
      />
      <DescriptionField
        register={register("description")}
        label="Contest Description"
        placeholder="Enter your description"
      />
      <SingleSelect
        isRequired={true}
        register={register("category", {
          required: true,
        })}
        label="Category"
        data={CATEGORY_DATA}
      />
      <div className="date-wrapper flex items-center gap-x-4">
        <InputField
          register={register("start_date", {
            required: true,
          })}
          isRequired={true}
          type="date"
          label="Start Date"
          placeholder="Enter your contest start date"
        />

        <InputField
          register={register("end_date", {
            required: true,
          })}
          isRequired={true}
          type="date"
          label="End Date"
          placeholder="Enter your contest end date"
        />
      </div>
      <DescriptionField
        isRequired={true}
        register={register("questions", {
          required: true,
        })}
        label="Questions"
        placeholder="Enter your questions"
      />
      <InputField
        register={register("organisation_id")}
        className="hidden"
        isRequired={true}
        type="text"
        label="Organisation"
        value={"1"}
        placeholder="Enter your organisation id"
      />
      <InputField
        register={register("status")}
        className="hidden"
        isRequired={true}
        label="Status"
        value={"yet_to_start"}
        placeholder="Enter contest status"
      />
      <DescriptionField
        isRequired={true}
        register={register("job_description", {
          required: true,
        })}
        label="Job Description"
        placeholder="Enter the job requirements"
      />
    </div>
  );
};
const CreateContestForm = () => {
  const onSubmitHandler = (data: any) => {
    console.log(data);
  };
  return (
    <FormLayout
      formTitle="Create Contest"
      submitHandler={onSubmitHandler}
      form={ContestForm}
      infoContent={<>Test2</>}
    />
  );
};

export default CreateContestForm;
