"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CommentValidation } from "@/lib/Validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "../ui/input";

export default function Comment({threadId, currentUserImg, currentUserId}: {threadId:string, currentUserImg:string, currentUserId:string}) {
    const pathname = usePathname()

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
          thread: "",
        },
      });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname
          );
      
        form.reset();
    }

    
    return (
        <Form {...form}>
            <form
            className='comment-form'
            onSubmit={
                form.handleSubmit(onSubmit)
            }
            >
                <FormField
                control={form.control}
                name='thread'
                render={({ field }) => (
                    <FormItem className='flex w-full gap-3'>
                    <FormLabel>
                        <Image
                            src = {currentUserImg}
                            alt = "profile_pic"
                            width = {48}
                            height = {48}
                            className="rounded-full"
                        />
                    </FormLabel>
                    <FormControl className="border-none bg-transparent">
                        <Input
                            type = 'text'
                            {...field}
                            placeholder = "Comment..."
                            className= "no-focus text-light-1 outline-none"
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            
                <Button type='submit' className='comment-form_btn'>
                    Reply
                </Button>
            </form>
        </Form>
    )
}

function validateComment(input: any) {
    try {
      CommentValidation.parse(input);
      console.log("Validation passed");
    } catch (e: any) {
      console.error("Validation error:", e.errors);
    }
  }