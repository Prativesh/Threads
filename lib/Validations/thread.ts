import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z.string().min(3, { message: "Minimum 3 characters." }).max(300, { message: "Max 300 characters." }),
  accountId: z.string(),
});


export const CommentValidation = z.object({
  thread: z.string().min(2, { message: "Minimum 2 characters." }),
});