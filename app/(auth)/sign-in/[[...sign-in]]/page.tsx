import { SignIn } from "@clerk/nextjs";


export default function Page() {
  return (
    <div className="bg-dark-1 w-screen h-screen justify-center items-center flex">
      <SignIn />
    </div>
  )
}