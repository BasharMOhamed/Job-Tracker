import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    await connectDB();
    const body = await req.json();
    // body.attachments.map((attachment: any) => (attachment.url = "help"));
    console.log("BODY", body);
    const newApp = await ApplicationModel.create({ ...body, userId });
    return NextResponse.json(newApp);
  } catch (error) {
    return new NextResponse(`Internal Server Error ${error}`, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    await connectDB();
    const applications = await ApplicationModel.find({ userId });
    return NextResponse.json(applications);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
