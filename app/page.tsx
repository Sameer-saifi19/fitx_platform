import { auth } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      {session?.user?.name} <br />
      {session?.user?.email} <br />
      {session?.user?.id} <br />
    </div>
  );
}
