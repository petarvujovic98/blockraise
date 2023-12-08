"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { ImageInput } from "~/components/inputs/image";
import { TextInput } from "~/components/inputs/text";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { useZodForm } from "~/hooks/form";
import {
  BLOCK_RAISE_CONTRACT_ID,
  SOCIAL_CONTRACT_ID,
  TX_GAS,
} from "~/lib/constants/tx";
import { viewProfile } from "~/lib/fetch";
import { calculateDeposit } from "~/lib/social";
import {
  useAccountId,
  useSignIn,
  useSignTx,
  useSignTxs,
} from "~/stores/global";

const registerSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  image: z.string().optional(),
});

export default function RegisterPage() {
  const accountId = useAccountId();
  const [cid, setCid] = useState<string>("");
  const form = useZodForm(registerSchema);
  const signTx = useSignTx();
  const signTxs = useSignTxs();
  const signIn = useSignIn();

  useEffect(() => {
    if (!accountId) {
      return;
    }
    viewProfile(accountId)
      .then((profile) => {
        setCid("ipfs_cid" in profile.image ? profile.image.ipfs_cid : "");
        form.setValue("name", profile.name);
      })
      .catch(console.error);
  }, [accountId, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          if (!accountId) {
            return signIn();
          }
          const profile = await viewProfile(accountId);

          const isImageDifferent =
            "ipfs_cid" in profile.image
              ? profile.image.ipfs_cid !== data.image
              : !!cid;

          if (!(profile.name !== data.name || isImageDifferent)) {
            return await signTx("register", {}, 1n);
          }

          const deposit = await calculateDeposit(accountId, {
            name: data.name,
            image: { ipfs_cid: cid },
          });
          await signTxs([
            {
              receiverId: BLOCK_RAISE_CONTRACT_ID,
              actions: [
                {
                  type: "FunctionCall",
                  params: {
                    deposit: "1",
                    methodName: "register",
                    args: {},
                    gas: TX_GAS.toString(),
                  },
                },
              ],
            },
            {
              receiverId: SOCIAL_CONTRACT_ID,
              actions: [
                {
                  type: "FunctionCall",
                  params: {
                    deposit: deposit.toString(),
                    methodName: "set",
                    args: {
                      data: {
                        [accountId]: {
                          profile: {
                            name: data.name,
                            image: {
                              ipfs_cid: cid,
                            },
                          },
                        },
                      },
                    },
                    gas: TX_GAS.toString(),
                  },
                },
              ],
            },
          ]);
        })}
      >
        <TextInput
          control={form.control}
          name="name"
          placeholder="Enter your name"
          rules={{ required: true }}
          disabled={false}
        />
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
        <Button type="submit" variant="default">
          Register
        </Button>
      </form>
    </Form>
  );
}
