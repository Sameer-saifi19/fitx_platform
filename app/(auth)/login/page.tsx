import { signin } from "@/actions/user"
import { auth, signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function SigninPage() {
    const session = await auth();
    if(session){
        redirect('/')
    }
    return (
        <Card className="w-full max-w-sm text-center gap-3">
            <CardHeader>
                <CardTitle className="text-xl">sign into fitX</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={signin}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                name="email"
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Input id="password" type="password" name="password" required />
                        </div>

                        <div className="grid gap-2">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>

                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <form className="w-full" action={async () => {
                    "use server"
                    await signIn("google")
                }}>
                    <Button variant="outline" type="submit" className="w-full">
                        Login with Google
                    </Button>
                </form>
                <CardDescription className="mt-2 text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="underline underline-offset-4">
                        Register
                    </Link>
                </CardDescription>
            </CardFooter>
        </Card>
    )
}
