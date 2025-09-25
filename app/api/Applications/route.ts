import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    console.log("Connected");
    const body = await req.json();
    const newApp = await ApplicationModel.create(body);
    return NextResponse.json(newApp);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const applications = await ApplicationModel.find();
    return NextResponse.json(applications);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
