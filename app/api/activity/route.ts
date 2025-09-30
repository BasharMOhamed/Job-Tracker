import { connectDB } from "@/lib/mongodb";
import { ActivityModel } from "@/models/Activity";
import { NextRequest, NextResponse } from "next/server";

// GET ACTIVITIES
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;
    const countParam = searchParams.get("count") || 4;

    const activities = await ActivityModel.find()
      .sort({ createdAt: -1 })
      .limit(+countParam);

    return NextResponse.json(activities);
  } catch (error) {
    return new NextResponse("[GET_ACTIVITIES] Internal Server Error", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    console.log(body);
    const activity = await ActivityModel.create(body);

    return NextResponse.json(activity);
  } catch (error) {
    return new NextResponse(`[POST_ACTIVITY] Internal Server Error ${error}`, {
      status: 500,
    });
  }
}
