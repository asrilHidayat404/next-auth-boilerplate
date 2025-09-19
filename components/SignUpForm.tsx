"use client"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ArrowLeftCircle, LoaderIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { signUp } from "@/action/AuthenticationAction"

export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setLoading(true);

        try {
            await signUp(formData); // jika sukses, langsung lanjut
            toast.success("Account Created");
            router.push("/sign-in");
        } catch (error: any) {
            // menampilkan error validasi atau server
            toast.error(error?.message || "Failed to Create Account");
        } finally {
            setLoading(false);
        }
    };

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">

                    <div className="relative hidden md:block">
                        <Image
                            src="/illustrations/sign-up-bg.png"
                            alt="Login Background"
                            fill
                            className="object-contain dark:brightness-[0.7] dark:grayscale"
                        />
                    </div>
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">NEXT GEN'Z</h1>
                                <p className="text-muted-foreground text-balance">
                                    Create an Account
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="enter your full name"

                                    name="fullName"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="enter your email"

                                    name="email"
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                />
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Confirm Password</Label>
                                </div>
                                <Input
                                    id="passwordConfirmation"
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="passwordConfirmation"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="showPassword"
                                    type="checkbox"
                                    onChange={(e) => {
                                        setShowPassword(prev => !prev)
                                    }}
                                    className="h-4 w-4 cursor-pointer"
                                />
                                <Label htmlFor="showPassword" className="text-sm">
                                    Show Password
                                </Label>
                            </div>
                            <Button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 cursor-pointer">
                                {loading && <LoaderIcon className="animate-spin h-5 w-5" />}
                                <span>{loading ? "Creating Account..." : "Register"}</span>
                            </Button>

                            {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div> */}

                        </div>
                        <footer className="flex justify-between mt-4">
                            {/* Back button */}
                            <Link
                                href="/sign-in"
                                className="text-sm flex items-center gap-2 hover:underline"
                            >
                                <ArrowLeftCircle className="w-4 h-4" />
                                Back to Login
                            </Link>
                        </footer>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
