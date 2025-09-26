import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Upload,
} from "lucide-react";

import { UserProvider } from "@/context/UserContext";
import UserButtonAction from "@/components/User/UserButtonAction";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { User } from "@/types";

const getInitials = (name: string | null) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const DataTable = ({ users }: {
    users: User[];
}) => {
  const headers = [
    { key: "no", label: "No", className: "w-12" },
    { key: "full_name", label: "Full Name", className: "w-[200px]" },
    { key: "email", label: "Email", className: "w-[180px]" },
    { key: "role", label: "Role", className: "w-24" },
    { key: "verified", label: "Verified", className: "w-20" },
    { key: "created", label: "Created", className: "w-32" },
    { key: "actions", label: "", className: "w-16" },
  ];
  return (
    <ScrollArea className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header.key}
                className={`text-xs font-medium text-muted-foreground px-4 py-3 ${header.className}`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id} className="hover:bg-muted/50">
              {/* No */}
              <TableCell className="px-4 py-2 text-sm text-muted-foreground">
                {index + 1}
              </TableCell>

              {/* User */}
              <TableCell className="px-4 py-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.avatar ? `/storage/${user.avatar}` : ""}
                    />
                    <AvatarFallback className="text-xs">
                      {getInitials(user.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium line-clamp-1">
                      {user.full_name || "Unnamed User"}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Email */}
              <TableCell className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm line-clamp-1">{user.email}</span>
                </div>
              </TableCell>

              {/* Role */}
              <TableCell className="px-4 py-2">
                <Badge
                  variant={
                    user.role?.role_name === "admin"
                      ? "destructive"
                      : "secondary"
                  }
                  className="text-xs"
                >
                  {user.role?.role_name || "No Role"}
                </Badge>
              </TableCell>

              {/* Verified */}
              <TableCell className="px-4 py-2">
                {user.emailVerified ? (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-muted-foreground">Yes</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">No</span>
                  </div>
                )}
              </TableCell>

              {/* Created At */}
              <TableCell className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell className="px-4 py-2">
                <UserProvider>
                  <UserButtonAction selectedUser={user} />
                </UserProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {users.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No users found</div>
          <Button variant="outline" className="mt-2">
            <Upload className="h-4 w-4 mr-2" />
            Import Users
          </Button>
        </div>
      )}

      {/* Pagination */}
      {users.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Showing 1 to {users.length} of {users.length} results
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      )}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default DataTable;
