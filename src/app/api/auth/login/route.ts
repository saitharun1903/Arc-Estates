import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { signToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check against database AdminUser
    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    const defaultAdminEmail = (process.env.ADMIN_EMAIL || "admin@arcavenue.in").toLowerCase().trim();
    const defaultAdminPassword = process.env.ADMIN_PASSWORD || "arcavenue2025";

    let isValid = false;
    let userId = user?.id || "default-admin";
    let role = user?.role || "SUPER_ADMIN";

    if (user) {
      isValid = await bcrypt.compare(password, user.passwordHash);
    } else if (email.toLowerCase().trim() === defaultAdminEmail && password === defaultAdminPassword) {
      // Fallback for demo instant login if database not yet seeded
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials. For demo access use admin@arcavenue.in / arcavenue2025" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId,
      email: email.toLowerCase().trim(),
      role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        email: email.toLowerCase().trim(),
        role,
      },
    });

    // Set HTTP-Only Cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Authentication system error" },
      { status: 500 }
    );
  }
}
