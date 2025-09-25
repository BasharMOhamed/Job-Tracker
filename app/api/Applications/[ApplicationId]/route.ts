import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { ApplicationId: string } }
) {
  try {
    await connectDB();
    const { ApplicationId } = params;
    console.log("App ID: ", ApplicationId);
    const app = await ApplicationModel.findById(ApplicationId);
    if (!app) {
      return new NextResponse("Application Not Found", { status: 404 });
    }

    await ApplicationModel.findByIdAndDelete(ApplicationId);
    return new NextResponse("Application Deleted Successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Internal Server", { status: 500 });
  }
}
