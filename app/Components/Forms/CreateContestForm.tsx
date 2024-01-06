"use client";
import FormLayout from "./FormLayout";
import { Controller, FieldValues, UseFormRegister } from "react-hook-form";
import SingleSelect from "./Fields/SingleSelect";
import InputField from "./Fields/InputField";
import { toast } from "react-toastify";
import { requestWrapper } from "@/lib/requestWrapper";
import Toast from "../Toasts/Toast";
import { useRouter } from "next/navigation";
import RichTextEditor from "../Editor/RichTextEditor";
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { TONE_TYPES } from "../Editor/constants";
import Mic from "../Icons/Mic";
import { useState } from "react";
import RightArrow from "../Icons/RightArrow";
import clsx from "clsx";
import Button from "../Buttons";
import moment from "moment";

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

export const CATEGORY_DATA = [
  { label: "Sales", value: "sales" },
  { label: "Customer Support", value: "customer_support" },
  { label: "Marketing", value: "marketing" },
  { label: "Product Associate", value: "product_associate" },
  { label: "User Engineer", value: "user_engineer" },
  { label: "Demo Engineer", value: "demo_engineer" },
];

export const QUESTION_TYPE = [
  { label: "Email", value: "email" },
  { label: "Bot Converstaion", value: "bot_conversation" },
];
const ContestForm = (
  register: UseFormRegister<FieldValues>,
  control: any,
  getValues: any
) => {
  const [questions, setQuestion] = useState([Date.now()]);
  return (
    <div className="form-wrapper flex flex-col gap-y-8">
      <InputField
        type="text"
        value={`CN-${moment().unix()}`}
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
      <Controller
        name="description"
        rules={{ required: true }}
        control={control}
        defaultValue=""
        render={({ field }) => {
          return (
            <RichTextEditor
              proFeature
              label="Description"
              isRequired
              placeholder="Enter the contest description"
              fieldName="description"
              field={field}
            />
          );
        }}
      />
      <Controller
        name="job_description"
        rules={{ required: true }}
        control={control}
        defaultValue=""
        render={({ field }) => {
          return (
            <RichTextEditor
              proFeature
              label="Job Description"
              isRequired
              placeholder="Enter the job requirements"
              fieldName="job_description"
              field={field}
            />
          );
        }}
      />
      <SingleSelect
        isRequired={true}
        register={register("role", {
          required: true,
        })}
        label="Role"
        data={CATEGORY_DATA}
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

      <Card radius="sm" shadow="sm">
        <CardHeader className="header-1-400">Contest Questions</CardHeader>
        <CardBody>
          <Accordion variant="splitted">
            {questions.map((question) => {
              return (
                <AccordionItem
                  indicator={<RightArrow />}
                  key={question}
                  aria-label="Accordion 1"
                  title={
                    getValues(`questions.question_${question}.title`) || "Title"
                  }
                >
                  <div className="wrapper flex flex-col gap-y-4">
                    <section className="question-header flex flex-col gap-y-6">
                      <div className="header-row flex justify-between gap-4">
                        <InputField
                          value={getValues(
                            `questions.question_${question}.title`
                          )}
                          register={register(
                            `questions.question_${question}.title`
                          )}
                          isRequired={true}
                          placeholder="Enter your question title"
                        />
                        <SingleSelect
                          defaultSelectedKeys={[
                            getValues(`questions.question_${question}.type`) ||
                              "email",
                          ]}
                          className="flex-1 min-w-[150px]"
                          isRequired={true}
                          register={register(
                            `questions.question_${question}.type`,
                            {
                              required: true,
                            }
                          )}
                          placeholder="Question type"
                          data={QUESTION_TYPE}
                        />
                      </div>
                      {getValues(`questions.question_${question}.type`) ==
                        "bot_conversation" && (
                        <InputField
                          value={getValues(
                            `questions.question_${question}.initial_text`
                          )}
                          register={register(
                            `questions.question_${question}.initial_text`
                          )}
                          isRequired={true}
                          placeholder="Enter the initial chat"
                        />
                      )}
                    </section>
                    <section className="question-body mb-2 flex flex-col gap-y-2">
                      <Controller
                        name={`questions.question_${question}.content`}
                        rules={{ required: true }}
                        control={control}
                        defaultValue=""
                        render={({ field }) => {
                          return (
                            <RichTextEditor
                              proFeature
                              label="Question Content"
                              isRequired
                              placeholder="Enter the contest question"
                              fieldName={`questions.question_${question}.content`}
                              field={field}
                            />
                          );
                        }}
                      />
                      <div className="action-footer flex justify-between items-cent">
                        {getValues(`questions.question_${question}.type`) ==
                          "bot_conversation" && (
                          <SingleSelect
                            startContent={<Mic />}
                            defaultSelectedKeys={[
                              getValues(
                                `questions.question_${question}.tone`
                              ) || "angry",
                            ]}
                            className="flex-1 max-w-[180px]"
                            isRequired={true}
                            register={register(
                              `questions.question_${question}.tone`,
                              {
                                required: true,
                              }
                            )}
                            placeholder="Tone"
                            data={TONE_TYPES}
                          />
                        )}
                        <Button
                          isDisabled={questions.length === 1}
                          radius="sm"
                          color="danger"
                          onClick={() => {
                            setQuestion((prev) =>
                              prev.filter((id) => id !== question)
                            );
                          }}
                          className={clsx(
                            questions.length === 1 && "cursor-no-drop"
                          )}
                        >
                          Delete
                        </Button>
                      </div>
                    </section>
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardBody>
        <CardFooter>
          <div className="footer-wrapper w-full flex flex-end justify-end">
            <Button
              isDisabled={questions.length > 2}
              className={clsx(questions.length > 2 && "cursor-no-drop")}
              type="button"
              color="primary"
              onClick={() => setQuestion((prev) => [...prev, Date.now()])}
            >
              Add
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
const CreateContestForm = () => {
  const router = useRouter();
  const onSubmitHandler = async (data: any) => {
    try {
      await requestWrapper("contest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Contest created successfuly");
      // router.push("/contests");
    } catch {
      toast.error("Unable to create Contest!");
    }
  };
  return (
    <>
      <FormLayout
        formTitle=""
        submitHandler={onSubmitHandler}
        form={ContestForm}
        infoContent={<></>}
      />
      <Toast />
    </>
  );
};

export default CreateContestForm;
