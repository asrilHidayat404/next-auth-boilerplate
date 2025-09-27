"use client";
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

import { UserProvider, useUser } from "@/context/UserContext";
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



const DataTable = React.memo(({ users }: { users: User[] }) => {
  const headers = [
    { key: "no", label: "No", className: "w-8" },
    { key: "full_name", label: "Full Name", className: "w-32" },
    { key: "role", label: "Role", className: "w-20" },
    { key: "status", label: "Status", className: "w-20" },
    { key: "gender", label: "Gender", className: "w-20" },
    { key: "address", label: "Address", className: "w-40" },
    { key: "verified", label: "Verified", className: "w-16" },
    { key: "created", label: "Created", className: "w-24" },
    { key: "actions", label: "", className: "w-12" },
  ];

  const { user } = useUser();
  const renderUser = user?.length ? user : users;

  console.log("Table rendered");
  

  return (
    <ScrollArea className="w-full">
      <Table className="text-xs">
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header.key}
                className={`font-medium text-muted-foreground px-2 py-2 ${header.className}`}
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {renderUser.map((user, index) => (
            <TableRow key={user.id} className="hover:bg-muted/50">
              {/* No */}
              <TableCell className="px-2 py-1 text-muted-foreground text-center">
                {index + 1}.
              </TableCell>

              {/* User Info */}
              <TableCell className="px-2 py-1">
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={user.avatar ? `/storage/${user.avatar}` : ""}
                    />
                    <AvatarFallback className="text-[10px]">
                      {getInitials(user.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium line-clamp-1 truncate">
                      {user.full_name || "Unnamed User"}
                    </p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Mail className="h-2.5 w-2.5 text-muted-foreground" />
                      <span className="text-muted-foreground truncate line-clamp-1">
                        {user.email || "No email"}
                      </span>
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* Role */}
              <TableCell className="px-2 py-1">
                <Badge
                  variant={
                    user.role?.role_name === "admin"
                      ? "destructive"
                      : "secondary"
                  }
                  className="text-[10px] px-1 py-0 h-4"
                >
                  {user.role?.role_name || "No Role"}
                </Badge>
              </TableCell>

              {/* Status */}
              <TableCell className="px-2 py-1">
                <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                  Active
                </Badge>
              </TableCell>

              {/* Gender */}
              <TableCell className="px-2 py-1">
                <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">
                  Laki-laki
                </Badge>
              </TableCell>

              {/* Address */}
              <TableCell className="px-2 py-1">
                <div className="max-w-[120px]">
                  <span className="line-clamp-2 leading-tight text-wrap">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At, ea.
                  </span>
                </div>
              </TableCell>

              {/* Verified */}
              <TableCell className="px-2 py-1">
                {user.emailVerified ? (
                  <div className="flex items-center gap-1 justify-center">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span className="text-muted-foreground">Yes</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 justify-center">
                    <XCircle className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">No</span>
                  </div>
                )}
              </TableCell>

              {/* Created At */}
              <TableCell className="px-2 py-1">
                <div className="flex items-center gap-1">
                  <Calendar className="h-2.5 w-2.5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(user.createdAt))}
                  </span>
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell className="px-2 py-1">
                <UserButtonAction selectedUser={user} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {users.length === 0 && (
        <div className="text-center py-8">
          <div className="text-muted-foreground text-sm">No users found</div>
          <Button variant="outline" size="sm" className="mt-2">
            <Upload className="h-3 w-3 mr-1" />
            Import Users
          </Button>
        </div>
      )}

      {/* Pagination */}
      {users.length > 0 && (
        <div className="flex items-center justify-between px-2 py-2 border-t">
          <div className="text-xs text-muted-foreground">
            Showing {renderUser.length} of {users.length} results
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Next
            </Button>
          </div>
        </div>
      )}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
});

export default React.memo(DataTable);