import { authOptions } from "@/lib/authconfig";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function getSessionData() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin')
  }

  return session

}