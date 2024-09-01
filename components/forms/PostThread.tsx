"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ThreadValidation } from "@/lib/Validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";

export default function PostThread({userId}: {userId:string}) {

    const pathname = usePathname()
    const router = useRouter()

    const form = useForm<z.infer<typeof ThreadValidation>>({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
          thread: "",
          accountId: userId
        },
      });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        
        await createThread({
            text: values.thread, 
            author: userId, 
            path: pathname
        })

        router.push("/")
    }

    
    return (
        <Form {...form}>
            <form
            className='flex flex-col justify-start mt-10 gap-5'
            onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                control={form.control}
                name='thread'
                render={({ field }) => (
                    <FormItem className='flex w-full flex-col gap-3'>
                    <FormLabel className='text-base-semibold text-light-2'>
                        Enter text
                    </FormLabel>
                    <FormControl>
                        <Textarea
                        rows={10}
                        className='account-form_input no-focus'
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            
                <Button type='submit' className='bg-primary-500'>
                    Post Thread
                </Button>
            </form>
        </Form>
    )
}