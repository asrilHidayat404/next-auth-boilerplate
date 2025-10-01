// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { v4 as uuid } from "uuid";
import { Resend } from "resend";
import { ResetPasswordEmail } from "@/components/ResetPassword";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    // Jangan beri tahu user apakah email ada atau tidak
    return NextResponse.json({ success: true });
  }

  const token = uuid();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

  await db.userToken.create({
    data: {
      token,
      userId: user.id,
      type: "RESET_PASSWORD",
      expires,
    },
  });

  if(!user.full_name || !token) {
    throw new Error("something went wrong")
  }

  // Kirim email pakai Resend
  const response = await resend.emails.send({
    from: "onboarding@resend.dev", // domain harus diverifikasi
    to: 'asril.hidayat.2004@gmail.com',
    subject: "Reset Your Password",
    react: ResetPasswordEmail({ firstName: user.full_name, token }),
  });

  console.log("Resend response:", response);

  return NextResponse.json({ success: true });
}
