import { BookOpen, Bot, Frame, PieChart, Settings2, SquareTerminal } from "lucide-react"

// This is sample data.
export const data = {
    navMain: [
         {
            title: "User Management",
            url: "/dashboard/users",
            icon: SquareTerminal,
            roles: ["admin"], // ✅ semua boleh
            items: [
                {
                    title: "Users",
                    url: "/dashboard/users/",
                    roles: ["admin"], // ✅ khusus admin
                },
                {
                    title: "Admin",
                    url: "/dashboard/users/admin",
                    roles: ["admin"], // ✅ khusus admin
                },
                {
                    title: "User",
                    url: "/dashboard/users/user",
                    roles: ["admin"], // ✅ khusus admin
                },
            ],
        },
        {
            title: "Post",
            url: "/dashboard/post",
            icon: SquareTerminal,
            roles: ["admin", "user"], // ✅ semua boleh
            items: [
                {
                    title: "Post",
                    url: "/dashboard/post",
                    roles: ["admin", "user"], // ✅ khusus admin
                },
                {
                    title: "Create Post",
                    url: "/dashboard/post/create-post",
                    roles: ["admin", "user"], // ✅ hanya admin
                },
            ],
        },
        // {
        //     title: "Models",
        //     url: "/dashboard/models",
        //     icon: Bot,
        //     roles: ["admin", "staff"], // ✅ user biasa gak boleh
        //     items: [],
        // },
        // {
        //     title: "Documentation",
        //     url: "/dashboard/docs",
        //     icon: BookOpen,
        //     roles: ["admin", "staff", "user"], // ✅ semua bisa
        //     items: [],
        // },
        // {
        //     title: "Settings",
        //     url: "/dashboard/settings",
        //     icon: Settings2,
        //     roles: ["admin"], // ✅ khusus admin
        //     items: [],
        // },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "/projects/design",
            icon: Frame,
            roles: ["admin", "user"],
        },
        {
            name: "Sales & Marketing",
            url: "/projects/sales",
            icon: PieChart,
            roles: ["admin"],
        },
    ]

}