import { z } from "zod";

export const accountIdSchema = z
  .string()
  .min(2)
  .max(64)
  .regex(/^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/);

export const placeholderImage =
  "https://img.icons8.com/?size=512&id=Dajn8muCcSHe&format=png";

export const imageSchema = z
  .union([
    z.object({
      url: z.string().url(),
    }),
    z.object({
      img: z.string().url(),
    }),
    z.object({
      ipfs_cid: z.string(),
    }),
    z.object({
      nft: z.object({
        contractId: accountIdSchema,
        tokenId: z.string(),
      }),
    }),
  ])
  .optional()
  .default({ img: placeholderImage });

export type Image = z.infer<typeof imageSchema>;

export const teamMemberSchema = z.object({
  account_id: accountIdSchema.optional(),
  name: z.string(),
  image: imageSchema,
  background: z.string(),
});

export const profileSchema = z.object({
  account_id: accountIdSchema,
  name: z.string().optional().default(""),
  image: imageSchema,
  blockraise: z
    .object({
      description: z.string().optional().default(""),
      funding_goal: z.string().optional().default(""),
      current_funding: z.string().optional().default(""),
      timeline: z.string().optional().default(""),
      team: z.record(z.string(), teamMemberSchema).optional().default({}),
    })
    .default({}),
});

export type Profile = z.infer<typeof profileSchema>;
