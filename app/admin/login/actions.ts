// app/admin/login/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(prevState: any, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return { error: "Invalid username or password" };
  }

  (await cookies()).set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/",
  });

  return { success: true };
}

export async function handleLogout() {
  // Delete the admin session cookie by setting its maxAge to 0 or deleting it
  (await cookies()).set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });

  redirect("/admin/login");
}