
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/User/DataTable";
import db from "@/lib/db";
import {

  Search,
  Download,
  Upload,
  Plus,
  Filter,
  ChevronDown,
  PlusCircleIcon,
} from "lucide-react";

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
  });




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
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-10"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Import
                </Button>

                <Button size="sm" className="flex items-center gap-2">
                  <PlusCircleIcon className="h-4 w-4" />
                  Create User
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <DataTable users={users} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
