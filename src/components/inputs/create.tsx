"use client";

import { useState } from "react";
import { z } from "zod";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import { Send01Svg } from "~/icons";
import { Button } from "../ui/button";
import { ComboboxInput } from "./combobox";
import { ImageInput } from "./image";
import { NumberInput } from "./number";
import { TextInput } from "./text";
import { TextAreaInput } from "./text-area";

const createCampaignSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  goal: z.number().min(1),
  image: z.string().url(),
  userId: z.number().min(1),
  category: z.enum(["Business", "Charity", "Education", "Medical"]),
});

export function CreateCampaignInput() {
  const form = useZodForm(createCampaignSchema);
  const [cid, setCid] = useState<string>("");

  return (
    <Form {...form}>
      <form>
        <ImageInput
          name={"image"}
          control={form.control}
          label="Photo"
          rules={{ required: true }}
          defaultValue=""
          setCid={(cid) => {
            setCid(() => {
              return cid;
            });
          }}
          cid={cid}
          generate
          generateEnabled={form.formState.isValid && form.formState.isDirty}
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

        <TextInput
          control={form.control}
          name="name"
          placeholder="Enter the proposal title"
          rules={{ required: true }}
          disabled={false}
        />
        <TextAreaInput
          control={form.control}
          name="description"
          placeholder="Add a short description"
          rules={{ required: true }}
          disabled={false}
          maxLength={500}
        />
        <NumberInput
          control={form.control}
          name="goal"
          placeholder="Enter the goal amount"
          rules={{ required: true }}
          disabled={false}
        />
        <Button
          variant="default"
          disabled={!form.formState.isValid}
          className="inline-flex flex-row items-center justify-between gap-2"
        >
          <Send01Svg className="w-5" />
          Create campaign
        </Button>
      </form>
    </Form>
  );
}
