"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { SearchUserAction } from "@/action/AuthenticationAction";
import { useUser } from "@/context/UserContext";

const SearchUserForm = () => {
  const [query, setQuery] = useState("");
  const { setUser } = useUser();

  const handleSearch = async (q: string) => {
    const res = await SearchUserAction(q);

    if (res.success && res.user) {
      console.log(res.user);
      setUser(
        res.user.map((user) => ({
          ...user,
          full_name: user.full_name ?? "",
          email: user.email ?? "",
          password: user.password ?? "",
          avatar: user.avatar ?? "",
          emailVerified: user.emailVerified ? user.emailVerified.toString() : "",
        }))
      );
    } else {
      toast.error(res.error || "❌ User tidak ditemukan");
      setUser(null); // kosongkan hasil user
    }
  };

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search users by name or email..."
        className="pl-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSearch(query);
          }
        }}
      />
    </div>
  );
};

export default SearchUserForm;
