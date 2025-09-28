import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { NextResponse } from "next/server";

// DELETE SPECIFIC APPLICATION
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ ApplicationId: string }> }
) {
  try {
    await connectDB();
    const { ApplicationId } = await params;
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
    return new NextResponse("[DELETE_APPLICATION] Internal Server", {
      status: 500,
    });
  }
}

// EDIT SPECIFIC APPLICATION
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ ApplicationId: string }> }
) {
  try {
    await connectDB();
    const { ApplicationId } = await params;
    const body = await req.json();

    const app = await ApplicationModel.findById(ApplicationId);
    if (!app) {
      return new NextResponse("This application doesn't exist", {
        status: 404,
      });
    }

    const newApplication = await ApplicationModel.findByIdAndUpdate(
      ApplicationId,
      {
        ...body,
        responseDate:
          body.status && body.status !== app.status && app.status === "Applied"
            ? new Date()
            : app.responseDate,
      }
    );
    return NextResponse.json(newApplication);
  } catch (error) {
    return new NextResponse("[EDIT_APPLICATION] Internal Server Error", {
      status: 500,
    });
  }
}

// GET SPECIFIC APPLICATION
export async function GET(
  req: Request,
  { params }: { params: Promise<{ ApplicationId: string }> }
) {
  try {
    await connectDB();
    const { ApplicationId } = await params;
    console.log("App ID: ", ApplicationId);
    const app = await ApplicationModel.findById(ApplicationId);
    if (!app) {
      return new NextResponse("Application Not Found", { status: 404 });
    }
    return NextResponse.json(app);
  } catch (error) {
    return new NextResponse("[GET_APPLICATION] Internal Server Error", {
      status: 500,
    });
  }
}
