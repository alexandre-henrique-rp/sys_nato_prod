"use server";
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(auth);
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body: any = await request.json();
    const tel = body.telefone;
   
    const api = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/checktel/${tel}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,

        }
      }
    );
    const data = await api.json();
    console.log("🚀 ~ data:", data);
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
