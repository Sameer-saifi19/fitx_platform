import { columns, Members } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Members[]> {
    // Fetch data from your API here.
    return [
        {
            id: "1213213",
            name: "sameer saifi",
            phone: 9639927782,
            status:  "active",
            gender: "Male",
            dateOfBirth: new Date("2005-10-17"),
            joinDate: new Date("2005-10-17"),
            email: "sameer.edu19@gmail.com",
        },
    ]
}

export default async function allMembers() {
    const data = await getData()

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}