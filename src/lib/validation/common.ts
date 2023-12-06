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

export const profileSchema = z.object({
  name: z.string().optional().default(""),
  image: imageSchema,
});

export type Profile = z.infer<typeof profileSchema>;
