import { z } from "zod";

export const messageSchema = z.object({
    text: z.string().min(1, 'Message must not be empty'),
});

export type MessageSchema = z.infer<typeof messageSchema>;
