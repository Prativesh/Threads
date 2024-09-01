"use server"

import AccountProfile from '@/components/forms/AccountProfile'
import { currentUser } from "@clerk/nextjs/server";
import React from 'react'

async function page()  {

  try{
    const user = await currentUser()
    if(!user) return null;

    const userInfo = {
      _id:"",
      username: "",
      name: "",
      bio: "",
      image: ""
    }

    const userData = {
      id: user.id || '',
      objectId: userInfo?._id || "",
      username: userInfo ? userInfo?.username : user?.username || "",
      name: userInfo ? userInfo?.name : user?.firstName ?? "",
      bio: userInfo ? userInfo?.bio : "",
      image: userInfo ? userInfo?.image : user?.imageUrl,
    }

    return (
      <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
        <h1 className='head-text'>Onboarding</h1>
        <p className='mt-3 text-base-regular text-light-2'>
          Complete your profile now, to use Threds.
        </p>
  
        <section className='mt-9 bg-dark-2 p-10'>
          <AccountProfile user={userData} btnTitle='Continue' />
        </section>
      </main>
    );
  } catch (error: any) {
    console.error("Failed to load page:", error);
    return <div className='flex justify-center items-center text-white h-screen'>Failed to load the page. Please try again later.</div>;
  }
}

export default page