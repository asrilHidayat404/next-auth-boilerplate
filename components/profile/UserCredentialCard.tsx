"use client";

import { Pen } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../ui/dialog';
import toast, { LoaderIcon } from 'react-hot-toast';
import { UpdatePasswordAction } from '@/action/AuthenticatedUserAction';

export default function UserCredentialCard() {
    const currentPasswordInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const passwordConfirmInput = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false)

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!currentPasswordInput.current || !passwordInput.current || !passwordConfirmInput.current) return;

        const formData = new FormData();
        formData.append("current_password", currentPasswordInput.current.value);
        formData.append("password", passwordInput.current.value);
        formData.append("password_confirmation", passwordConfirmInput.current.value);

        setLoading(true);
        const res = await UpdatePasswordAction(formData);
        setLoading(false);

        if (res.success) {
            toast.success("Password Updated");
            setDialogOpen(false)
            currentPasswordInput.current.value = "";
            passwordInput.current.value = "";
            passwordConfirmInput.current.value = "";
        } else {
            setDialogOpen(false)
            toast.error(res.error ?? "Failed to Update Password");
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 lg:mb-6 dark:text-white/90">Password</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Password: *******</p>
                </div>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default"><Pen /> Edit</Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Change Password</DialogTitle>
                            <DialogDescription>
                                Enter Current and New Password. Click Save to Update.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSave} className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="current_password">Current Password</Label>
                                <Input id="current_password" type="password" ref={currentPasswordInput} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">New Password</Label>
                                <Input id="password" type="password" ref={passwordInput} />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password_confirmation">Confirm Password</Label>
                                <Input id="password_confirmation" type="password" ref={passwordConfirmInput} />
                            </div>

                            <DialogFooter className="mt-3">
                                <DialogClose asChild>
                                    <Button variant="destructive">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={loading}>
                                    {loading && <LoaderIcon className="animate-spin h-5 w-5" />}

                                    {loading ? "Updating..." : "SUpdate"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
