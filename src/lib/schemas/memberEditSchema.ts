import { z } from "zod";

export const memberEditSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 character(s)"),
  description: z.string().min(3, "description is required"),
  city: z.string().min(3, "city is required"),
  country: z.string().min(3, "country is required"),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
