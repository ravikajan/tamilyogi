import { hashPassword } from "@/lib/password";
import { NextResponse } from "next/server";
import { signInSchema } from "@/lib/signInSchema";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma_client/primsa_client";
import { parsePhoneNumberWithError } from "libphonenumber-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = await signInSchema.parseAsync(body);
    // Validate phone number using libphonenumber-js
    if (!body.phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    let phoneNumber;
    try {
      phoneNumber = parsePhoneNumberWithError(body.phone);
      if (!phoneNumber.isValid()) {
        return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
    // Hash password
    const hashed = await hashPassword(password);
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name: body.name || null,
        phone: phoneNumber.number,
        // Add any additional fields from the registration form here
        ...Object.fromEntries(
          Object.entries(body).filter(
            ([key]) => !["email", "password", "name", "phone"].includes(key)
          )
        ),
      },
    });
    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name, phone: user.phone } });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}