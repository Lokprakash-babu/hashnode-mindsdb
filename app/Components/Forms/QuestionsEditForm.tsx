import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import RightArrow from "../Icons/RightArrow";
import InputField from "./Fields/InputField";
import SingleSelect from "./Fields/SingleSelect";
import { QUESTION_TYPE } from "./CreateContestForm";
import RichTextEditor from "../Editor/RichTextEditor";
import { TONE_TYPES } from "../Editor/constants";
import clsx from "clsx";
import Mic from "../Icons/Mic";
import { useState } from "react";
import { requestWrapper } from "@/lib/requestWrapper";
import { toast } from "react-toastify";
import Toast from "../Toasts/Toast";
import { useRouter } from "next/navigation";

const QuestionsEditForm = ({ questions, id, showEditForm }) => {
  const router = useRouter();
  const [questionIds, setQuestions] = useState(Object.keys(questions));
  const methods = useForm({
    mode: "onSubmit",
  });
  const submitHandler = async (data: any) => {
    const questions = {
      questions: JSON.stringify(data.questions),
    };
    try {
      await requestWrapper(`contest/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questions),
      });
      toast.success("Questions updated successfuly");
      router.push(window.location.href);
      showEditForm(false);
      router.refresh();
    } catch {
      toast.error("Unable to update Questions!");
    }
  };
  methods.watch("questions");
  <Toast />;
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>
        <Card radius="sm" shadow="sm">
          <CardBody>
            <Accordion
              defaultExpandedKeys={[...Object.keys(questions)]}
              variant="splitted"
            >
              {questionIds.map((question) => {
                return (
                  <AccordionItem
                    indicator={<RightArrow />}
                    key={question}
                    aria-label="Accordion 1"
                    title={
                      methods.getValues(`questions.${question}.title`) ||
                      questions[question]?.title ||
                      "Title"
                    }
                  >
                    <div className="wrapper flex flex-col gap-y-4">
                      <section className="question-header flex flex-col gap-y-6">
                        <div className="header-row flex justify-between gap-4">
                          <InputField
                            defaultValue={questions[question]?.title}
                            value={methods.getValues(
                              `questions.${question}.title`
                            )}
                            register={methods.register(
                              `questions.${question}.title`
                            )}
                            isRequired={true}
                            placeholder="Enter your question title"
                          />
                          <SingleSelect
                            defaultSelectedKeys={[
                              questions[question]?.type || "email",
                            ]}
                            className="flex-1 min-w-[150px]"
                            isRequired={true}
                            register={methods.register(
                              `questions.${question}.type`,
                              {
                                required: true,
                              }
                            )}
                            placeholder="Question type"
                            data={QUESTION_TYPE}
                          />
                        </div>
                        {methods.getValues(`questions.${question}.type`) ==
                          "bot_conversation" && (
                          <InputField
                            defaultValue={questions[question]?.initial_text}
                            value={methods.getValues(
                              `questions.${question}.initial_text`
                            )}
                            register={methods.register(
                              `questions.${question}.initial_text`
                            )}
                            isRequired={true}
                            placeholder="Enter the initial chat"
                          />
                        )}
                      </section>
                      <section className="question-body mb-2 flex flex-col gap-y-2">
                        <Controller
                          name={`questions.${question}.content`}
                          rules={{ required: true }}
                          control={methods.control}
                          defaultValue=""
                          render={({ field }) => {
                            return (
                              <RichTextEditor
                                proFeature
                                label="Question Content"
                                isRequired
                                placeholder="Enter the contest question"
                                fieldName={`questions.${question}.content`}
                                field={{ ...field }}
                                initialValue={questions[question]?.content}
                              />
                            );
                          }}
                        />
                        <div className="action-footer flex justify-between items-cent">
                          {methods.getValues(`questions.${question}.type`) ==
                            "bot_conversation" && (
                            <SingleSelect
                              startContent={<Mic />}
                              defaultSelectedKeys={[
                                questions[question]?.tone || "angry",
                              ]}
                              className="flex-1 max-w-[180px]"
                              isRequired={true}
                              register={methods.register(
                                `questions.${question}.tone`,
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
                            onClick={() => {
                              setQuestions((prev) =>
                                prev.filter((id) => id !== question)
                              );
                            }}
                            className={clsx(
                              "bg-[#C82124] text-white",
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
              <div className="action-wrapper flex gap-x-3">
                <Button
                  isDisabled={questions.length > 2}
                  className={clsx(
                    "rounded-md  border-[#12344D] !opacity-100 text-white bg-primary-btn-gradient min-w-[120px] min-h-8 px-6 py-1.5 hover:!bg-[#12334C] hover:opacity-100 active:!opacity-100",
                    questions.length > 2 && "cursor-no-drop"
                  )}
                  type="button"
                  onClick={() =>
                    setQuestions((prev) => {
                      return [...prev, `question_${Date.now()}`];
                    })
                  }
                >
                  Add
                </Button>
                <Button
                  className={clsx(
                    "rounded-md  border-[#12344D] !opacity-100 text-white bg-primary-btn-gradient min-w-[120px] min-h-8 px-6 py-1.5 hover:!bg-[#12334C] hover:opacity-100 active:!opacity-100",
                    questions.length > 2 && "cursor-no-drop"
                  )}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
};

export default QuestionsEditForm;
