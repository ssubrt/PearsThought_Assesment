import { auth } from "@/auth";

export default async function Home() {
  
  return (
    <>
      {/* <Header user={session?.user ? { ...session.user, name: session.user.name ?? undefined } : undefined} /> */}
      <div className="text-red-500 h-screen flex items-center justify-center">
        Hello World
      </div>
       
    </>
  );
}