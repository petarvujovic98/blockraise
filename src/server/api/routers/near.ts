import { z } from "zod";
import { providers } from "near-api-js";
import { type CodeResult } from "near-api-js/lib/providers/provider";

import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  accountIdSchema,
  placeholderImage,
  type Profile,
  profileSchema,
} from "~/lib/validation/common";

function getProvider() {
  return new providers.JsonRpcProvider({
    url: "https://rpc.mainnet.near.org",
  });
}

export function encodeArgs(args: Record<string, unknown>) {
  return Buffer.from(JSON.stringify(args)).toString("base64");
}

export async function viewCall<T>(
  contract: string,
  method: string,
  args: Record<string, unknown>,
) {
  const provider = getProvider();

  const result = await provider.query<CodeResult>({
    request_type: "call_function",
    finality: "final",
    account_id: contract,
    method_name: method,
    args_base64: encodeArgs(args),
  });

  return JSON.parse(Buffer.from(result.result).toString()) as T;
}

export const nearRouter = createTRPCRouter({
  profile: publicProcedure
    .input(z.object({ accountId: accountIdSchema }))
    .query(async ({ input }) => {
      const response = await viewCall<Record<string, { profile: Profile }>>(
        "social.near",
        "get",
        {
          keys: [`${input.accountId}/profile/**`],
        },
      );

      if (input.accountId in response) {
        return profileSchema.parse({
          ...response[input.accountId]?.profile,
          account_id: input.accountId,
        });
      }

      return {
        account_id: input.accountId,
        name: "",
        image: { url: placeholderImage },
        description: "",
        funding_goal: "",
        current_funding: "",
        timeline: "",
        team: {},
      } satisfies Profile;
    }),
});
