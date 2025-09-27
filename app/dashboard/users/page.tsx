import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CreateUserForm } from "@/components/User/CreateUserForm";
import DataTable from "@/components/User/DataTable";
import ExportUserButton from "@/components/User/ExportUserButton";
import { ImportUserButton } from "@/components/User/ImportUserForm";
import SearchUserForm from "@/components/User/SearchUserForm";
import db from "@/lib/db";
import { Search, Download, Upload, PlusCircleIcon } from "lucide-react";
import { Suspense } from "react";

const Page = async () => {
  const users = await db.user.findMany({
    include: {
      role: true,
    },
    orderBy: {
      role: {
        role_name: "asc", // 'admin' akan datang sebelum 'user'
      },
    },
    // take: 10
  });

  console.log("Page render");
  
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage system users and permissions
        </p>
      </div>

      <Card>
        <CardHeader>
          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchUserForm />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <ExportUserButton />

                <ImportUserButton />

                <CreateUserForm />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Suspense fallback={<TableLoading />}>
            <DataTable users={users} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

// Basic loading fallback
const TableLoading = () => (
  <div className="space-y-2 p-4">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
  </div>
);

export default Page;
