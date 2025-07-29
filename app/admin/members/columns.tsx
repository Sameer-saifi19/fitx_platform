"use client"

import { ColumnDef } from "@tanstack/react-table"

export type allMembers = {
    status: "active" | "inactive" | "trial" | "expired",
    id: string
    name: string
    address: string
    email: string
    phone: number
    gender: "Male" | "Female" | "Other"
    dateOfBirth: Date
    joinDate: Date
}

export const columns: ColumnDef<allMembers>[] = [
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "gender",
        header: "Gender",
    },
    {
        accessorKey: "dateOfBirth",
        header: "Date of birth",
    },
    {
        accessorKey: "joinDate",
        header: "Joined On",
    },
    {
        accessorKey: "action",
        header: "Action"
    }
]