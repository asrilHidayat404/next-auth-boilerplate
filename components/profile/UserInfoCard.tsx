"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "next-auth/react";
import toast, { LoaderIcon } from "react-hot-toast";
import {UpdateProfile } from "@/action/AuthenticatedUserAction";
import { Pen } from "lucide-react";

export default function UserInfoCard() {

  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: session, update } = useSession()

  const [formValues, setFormValues] = useState({
    fullName: session?.user?.fullName || "",
    email: session?.user?.email || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // update state saat session berubah
    setFormValues({
      fullName: session?.user?.fullName || "",
      email: session?.user?.email || "",
    });
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    setLoading(true)
    formData.append("fullName", formValues.fullName);
    formData.append("email", formValues.email);

    const res = await UpdateProfile(formData);

    if (res?.success) {
      
      await update(); // refresh session
      toast.success("Profile Updated");
      setDialogOpen(false);
      setLoading(false)
    } else {
      setLoading(false)

      toast.error(res?.error ?? "Failed to Update Profile!");
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">
            Personal Information
          </h4>

          <div
            className={`grid ${session?.user.role !== "Mahasiswa"
              ? "grid-cols-1"
              : "grid-cols-2"
              } place-content-between pt-3 gap-4 lg:gap-7 2xl:gap-x-32`}
          >
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Full Name
              </p>
              {!session?.user ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {session?.user?.fullName}
                </p>
              )}
            </div>
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Role
              </p>
              {!session?.user ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-white/90 capitalize">
                  {session?.user.role}
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Email address
              </p>
              {!session?.user ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {session?.user.email}
                </p>
              )}
            </div>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">
              <Pen />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px] lg:w-[769px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className={`grid grid-cols-1 gap-4`}>
                <div className="grid gap-3">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formValues.fullName}
                    onChange={handleChange}
                  />


                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <DialogFooter className="mt-3">
                <DialogClose asChild>
                  <Button variant="destructive">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                  {loading && <LoaderIcon className="animate-spin h-5 w-5" />}
                  <span>{loading ? "Updating..." : "Update"}</span>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
