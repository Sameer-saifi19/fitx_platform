import { signup } from "@/actions/user"
import { auth, signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import {
    Card,
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
                <CardTitle className="text-xl">Create your account</CardTitle>
                <CardDescription>
                    Enter your details below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={signup as any}>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="fullname">Full Name</Label>
                            <Input
                                id="fullname"
                                type="text"
                                placeholder="john doe"
                                required
                                name="fullname"
                            />
                        </div>
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
                        Register
                    </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col">
                <form className="w-full" action={async () => {
                    "use server"
                    await signIn("google")
                }}>
                    <Button variant="outline" type="submit" className="w-full">
                        Login with Google
                    </Button>
                </form>
                <CardDescription className="mt-2 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4">
                        Login
                    </Link>
                </CardDescription>
            </CardFooter>
        </Card>
    )
}
