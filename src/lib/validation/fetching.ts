import { z } from "zod";

export const fileUploadSchema = z.object({
  cid: z.string().min(59).max(59),
});
