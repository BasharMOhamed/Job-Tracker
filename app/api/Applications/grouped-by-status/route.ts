import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const result = await ApplicationModel.aggregate([
      {
        $group: {
          _id: "$status",
          apps: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          k: "$_id",
          v: "$apps",
        },
      },
      {
        $group: {
          _id: null,
          data: { $push: { k: "$k", v: "$v" } },
        },
      },
      {
        $replaceRoot: {
          newRoot: { $arrayToObject: "$data" },
        },
      },
    ]);

    return NextResponse.json(result[0]);
  } catch (error) {
    return new NextResponse(
      "[GET_APPLICATION_BY_STATUS] Internal Server Error",
      { status: 500 }
    );
  }
}
