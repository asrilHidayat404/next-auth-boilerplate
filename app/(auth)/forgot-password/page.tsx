"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const forgotPasswordSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Cek email untuk reset password!");
      } else {
        toast.error(json.error || "Gagal mengirim email reset");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan server");
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="lg:w-1/4 w-1/2 max-w-sm md:max-w-3xl">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Label>Email</Label>
          <Input {...register("email")} type="email" />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim..." : "Kirim Link Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
