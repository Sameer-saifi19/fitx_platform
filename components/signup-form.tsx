import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";


export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Create your account</CardTitle>
                    <CardDescription className="text-center">
                        Welcome! Please fill in your details to get started
                    </CardDescription>
                    <div className="grid mt-4 grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full gap-4 flex">
                            <FaGoogle/> Google
                        </Button>
                        <Button variant="outline" className="w-full gap-4 flex">
                           <FaApple/> Apple
                        </Button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <hr className="w-[47%]" />
                        <CardDescription>or</CardDescription>
                        <hr className="w-[47%]" />
                    </div>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Continue
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="http://localhost:3000/admin/auth/signin" className="underline underline-offset-4">
                                Sign in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
