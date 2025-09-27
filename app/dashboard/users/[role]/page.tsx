import db from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { User2Icon, Mail, Calendar, CheckCircle, XCircle, MoreHorizontal, Download, Upload, Plus, Search, PlusCircleIcon } from "lucide-react";
import UserButtonAction from "@/components/User/UserButtonAction";
import { UserProvider } from "@/context/UserContext";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/User/DataTable";
import ExportUserButton from "@/components/User/ExportUserButton";
import { ImportUserButton } from "@/components/User/ImportUserForm";
import { CreateUserForm } from "@/components/User/CreateUserForm";

const Page = async ({ params }: { params: { role: string } }) => {
  const { role } = await params;

  const roles = await db.role.findUnique({
    where: { role_name: role },
  });

  if (!roles) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-destructive mb-2">Role Not Found</h1>
              <p className="text-muted-foreground">Role "{role}" tidak ditemukan</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const users = await db.user.findMany({
    where: { role_id: roles.id },
    include: { role: true },
  });


  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight capitalize">User {role} Management</h1>
          <p className="text-muted-foreground">
            Manage {role.toLowerCase()} users and their permissions
          </p>
        </div>
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
                <ExportUserButton query={role} />

                <ImportUserButton />

                <CreateUserForm />
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