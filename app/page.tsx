import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/admin/auth/signin"}>
        signin
      </Link>
    </>
  );
}
