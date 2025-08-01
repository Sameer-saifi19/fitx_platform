'use client'

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
import { useForm } from "react-hook-form"
import { signupSchema } from "@/schemas/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from 'framer-motion';
import { signupAction } from "@/actions/signup"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"


export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<signupSchema>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange'
    })
    const router = useRouter();

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    const onsubmit = async (data: signupSchema) => {
        try {
            const admin = await signupAction(data)
            if (admin.error) {
                setError(admin.error)
            } else {
                setError(null)
                setSuccess("User created Successfully")
                router.push('/admin/auth/signin')
            }
        } catch (error: any) {
            console.error(error.message || "Something went wrong")
            setSuccess(null)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Create your account</CardTitle>
                    <CardDescription className="text-center">
                        Welcome! Please fill in your details to get started
                    </CardDescription>
                    <div className="grid mt-4 grid-cols-2 gap-4">
                        <Button variant="outline" onClick={() => signIn('google')} className="w-full gap-4 flex">
                            <FaGoogle /> Google
                        </Button>
                        <Button variant="outline" onClick={() => signIn('apple')} className="w-full gap-4 flex">
                            <FaApple /> Apple
                        </Button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <hr className="w-[47%]" />
                        <CardDescription>or</CardDescription>
                        <hr className="w-[47%]" />
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="first name">First name</Label>
                                    <Input
                                        {...register('firstName')}
                                        id="first name"
                                        type="text"
                                        placeholder="John"
                                        required
                                    />

                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="last name">Last name</Label>
                                    <Input
                                        {...register("lastName")}
                                        id="last name"
                                        type="text"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                                <AnimatePresence>
                                    {errors.firstName &&
                                        <motion.p initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-red-400 text-sm">
                                            {errors.firstName.message}
                                        </motion.p>}
                                </AnimatePresence>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register('email')}
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                />
                                <AnimatePresence>
                                    {errors.email &&
                                        <motion.p initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-red-400 text-sm">
                                            {errors.email.message}
                                        </motion.p>}
                                </AnimatePresence>
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="/admin/auth/password-reset"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" {...register("password")} type="password" required />
                                <AnimatePresence>
                                    {errors.password &&
                                        <motion.p initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-red-400 text-sm">
                                            {errors.password.message}
                                        </motion.p>}
                                </AnimatePresence>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button disabled={!isValid || isSubmitting} type="submit" className="w-full">
                                    Continue
                                </Button>
                            </div>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-red-400 text-sm text-center"
                                >
                                    {error}
                                </motion.p>
                            )}
                            {success && (
                                <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="text-green-600 text-sm text-center"
                                >
                                    {success}
                                </motion.p>
                            )}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <a href="/auth/signin" className="underline underline-offset-4">
                                Sign in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
