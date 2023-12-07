import { z } from "zod";
import { accountIdSchema } from "~/lib/validation/common";
import { viewProfile, viewStorageBalance } from "~/lib/fetch";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const nearRouter = createTRPCRouter({
  profile: publicProcedure
    .input(z.object({ account_id: accountIdSchema }))
    .query(async ({ input: { account_id } }) => {
      return viewProfile(account_id);
    }),
  storage_balance: publicProcedure
    .input(z.object({ account_id: accountIdSchema }))
    .query(async ({ input: { account_id } }) => {
      return viewStorageBalance(account_id);
    }),
});
