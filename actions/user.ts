'use server'

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const signup = async (formData: FormData) => {
    const fullname = formData.get('fullname') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if(existingUser){
        return { error: "user already exists"}
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
        data:{
            name: fullname,
            email: email,
            password: hashedPassword
        }
    })

    return { success: true, user}
}


const signin = async (formData: FormData) =>{
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
        await signIn('credentials', {
            redirect: false,
            callbackUrl: '/',
            email,
            password
        })
    } catch (error) {
        console.error('Error while signin')
    }
}

export { signup , signin }