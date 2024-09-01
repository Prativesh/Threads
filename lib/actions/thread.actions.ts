"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";

interface Params {
    text: string,
    author: string,
    path: string,
}
  
export async function createThread({ text, author, path }: Params) {
    try {
        await connectToDB();

        const createdThread = await Thread.create({
            text: text,
            author: author,
        })

        console.log("Thread Created successfully")

        await User.findByIdAndUpdate(author, {
            $push: { threads : createdThread._id}
        })

        console.log("Added created thread to user successfully")

        revalidatePath(path)

    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }
}


export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    await connectToDB()

    const skipContent = (pageNumber-1) * pageSize;

    const postQuery = Thread.find({ parentId: { $in: [undefined, null]}})
        .sort()
        .skip(skipContent)
        .limit(pageSize)
        .populate({
            path: 'author',
            model: User
        })
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                select: "_id name parentId image"
            }
        })
    
    const totalPosts = await Thread.countDocuments({
        parentId: {$in : [undefined, null]}
    })

    const posts = await postQuery.exec()

    const isNext = totalPosts > skipContent + posts.length

    return {posts, isNext}
}

export async function fetchThreadById(threadId: string) {
    connectToDB();
  
    try {
      const thread = await Thread.findById(threadId)
        .populate({
          path: "author",
          model: User,
          select: "_id id name image",
        }) // Populate the author field with _id and username
        .populate({
          path: "children", // Populate the children field
          populate: [
            {
              path: "author", // Populate the author field within children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
            {
              path: "children", // Populate the children field within children
              model: Thread, 
              populate: {
                path: "author", 
                model: User,
                select: "_id id name parentId image",
              },
            },
          ],
        })
        .exec();
  
      return thread;
    } catch (err) {
      console.error("Error while fetching thread:", err);
      throw new Error("Unable to fetch thread");
    }
  }


export async function addCommentToThread( threadId: string, commentText: string, userId: string, path: string) {
    await connectToDB()

    try {
        const originalThread = await Thread.findById(threadId)
        if(!originalThread) {
            throw new Error("Original thread not found")
        }

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        })

        const savedCommentThread = await commentThread.save();

        originalThread.children.push(savedCommentThread._id);
        await originalThread.save();

        revalidatePath(path);
        
    } catch (error: any) {
        throw new Error(`Failed to add comment: ${error.message}`)
    }
}