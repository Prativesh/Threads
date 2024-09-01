import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
    <div className="bg-dark-1 w-screen h-screen justify-center items-center flex">
      <SignUp forceRedirectUrl={"/onboarding"}/>
    </div>
    )
}