"use client";

import { useState } from "react";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { PlusCircleSvg, Send01Svg, XSvg } from "~/icons";
import { Button } from "../ui/button";
import { ComboboxInput } from "./combobox";
import { ImageInput } from "./image";
import { NumberInput } from "./number";
import { TextInput } from "./text";
import { TextAreaInput } from "./text-area";
import { useSignTx } from "~/stores/global";
import { createCampaignSchema } from "~/lib/validation/common";
import { DateInput } from "./date";
import { useFieldArray } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useRouter } from "next/navigation";

export function CreateCampaignInput() {
  const form = useZodForm(createCampaignSchema);
  const [cid, setCid] = useState<string>("");
  const signTx = useSignTx();
  const teamMembers = useFieldArray({
    control: form.control,
    name: "team",
  });
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          await signTx("create_campaign", {
            campaign: {
              ...data,
              image: cid,
              deadline: data.deadline.getTime(),
              team: Object.fromEntries(
                data.team.map((member) => [member.name, member]),
              ),
            },
          });
        })}
      >
        <Dialog
          open={form.formState.isSubmitting || form.formState.isSubmitted}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Campaign submission</DialogTitle>
              <DialogDescription>
                {form.formState.isSubmitting
                  ? "Submitting campaign..."
                  : "Campaign submitted!"}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="default"
                type="button"
                disabled={form.formState.isSubmitting}
                onClick={() => {
                  router.push("/");
                }}
              >
                Go to home
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ImageInput
          name="image"
          control={form.control}
          label="Photo"
          rules={{ required: true }}
          defaultValue=""
          setCid={(cid) => setCid(cid)}
          cid={cid}
          generate
          generateEnabled={form.formState.isValid && form.formState.isDirty}
        />

        <TextInput
          control={form.control}
          name="name"
          placeholder="Enter the campaign title"
          rules={{ required: true }}
          disabled={false}
        />

        <TextAreaInput
          control={form.control}
          name="description"
          placeholder="Add a short description"
          rules={{ required: true }}
          disabled={false}
          maxLength={1000}
        />

        <NumberInput
          control={form.control}
          name="goal"
          placeholder="Enter the goal amount"
          rules={{ required: true }}
          disabled={false}
        />

        <DateInput
          control={form.control}
          name="deadline"
          placeholder="Enter the deadline"
          invalidDates={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date.getTime() < today.getTime();
          }}
          rules={{ required: true }}
          disabled={false}
        />

        <ComboboxInput
          control={form.control}
          name="category"
          placeholder="Select a category"
          rules={{ required: true }}
          disabled={false}
          options={createCampaignSchema.shape.category.options.map((value) => ({
            text: value,
            value,
          }))}
        />

        <section>
          <h2 className="text-lg font-bold text-deep-navy-blue">
            Team members
          </h2>
          <div className="flex w-full flex-col items-start justify-start gap-6">
            {teamMembers.fields.map((field, index) => (
              <div
                key={field.id}
                className="relative flex w-full flex-col items-stretch justify-start gap-3"
              >
                <Button
                  variant="destructive"
                  type="button"
                  className="absolute right-0 top-0 flex w-1/12 flex-row items-center justify-center border-none"
                  onClick={() => teamMembers.remove(index)}
                >
                  <XSvg className="h-4 w-4" />
                </Button>
                <ImageInput
                  control={form.control}
                  name={`team.${index}.image` as const}
                  defaultValue=""
                  label="Photo"
                  setCid={(cid) => form.setValue(`team.${index}.image`, cid)}
                  cid={form.watch(`team.${index}.image` as const)}
                />
                <TextInput
                  control={form.control}
                  name={`team.${index}.name` as const}
                  defaultValue=""
                  label="Full name"
                />
                <TextInput
                  control={form.control}
                  name={`team.${index}.account_id` as const}
                  defaultValue=""
                  label="Account ID"
                />
                <TextAreaInput
                  control={form.control}
                  name={`team.${index}.background` as const}
                  defaultValue=""
                  label="Background"
                  maxLength={1000}
                />
              </div>
            ))}
            <div className="flex w-full flex-row items-start justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() =>
                  teamMembers.append(
                    {
                      name: "",
                      account_id: "",
                      image: "",
                      background: "",
                    },
                    { shouldFocus: true },
                  )
                }
                className="flex flex-row items-center justify-center gap-2"
              >
                <PlusCircleSvg className="h-4 w-4" />
                Add team member
              </Button>
            </div>
          </div>
        </section>

        <Button
          type="submit"
          variant="default"
          disabled={form.formState.isSubmitting}
          className="inline-flex flex-row items-center justify-between gap-2"
        >
          <Send01Svg className="w-5" />
          Create campaign
        </Button>
      </form>
    </Form>
  );
}
