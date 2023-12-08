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
  image: z.string(),
  background: z.string(),
});

export const createTeamMemberSchema = z.object({
  account_id: accountIdSchema.optional(),
  name: z.string().min(1).max(50),
  image: z.string().min(1),
  background: z.string().min(10).max(500),
});

export const contributorSchema = z.record(z.string(), z.number());

export const categorySchema = z.enum([
  "Business",
  "Charity",
  "Education",
  "Medical",
]);

export const campaignStatusSchema = z.enum([
  "Active",
  "Completed",
  "Failed",
  "Inactive",
]);

export const campaignSchema = z.object({
  account_id: accountIdSchema,
  owner: accountIdSchema,
  name: z.string(),
  description: z.string(),
  goal: z.number(),
  contributors: contributorSchema,
  deadline: z.number(),
  image: z.string(),
  team: z.record(z.string(), teamMemberSchema),
  category: categorySchema,
  status: campaignStatusSchema,
});

export type Campaign = z.infer<typeof campaignSchema>;

export const createCampaignSchema = z.object({
  name: z.string().min(5).max(50),
  description: z.string().min(50).max(1000),
  goal: z.number().min(1).max(1_000_000_000_000),
  deadline: z.date({ coerce: true }).min(new Date()),
  image: z.string().min(1),
  category: categorySchema,
  team: createTeamMemberSchema.array(),
});

export const profileSchema = z.object({
  account_id: accountIdSchema,
  name: z.string().optional().default(""),
  image: imageSchema,
});

export type Profile = z.infer<typeof profileSchema>;
