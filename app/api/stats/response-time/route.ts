import { connectDB } from "@/lib/mongodb";
import { ApplicationModel } from "@/models/Application";
import { auth } from "@clerk/nextjs/server";
import { differenceInDays } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { isAuthenticated, userId } = await auth();

    if (!isAuthenticated)
      return NextResponse.redirect(new URL("/sign-in", req.url));
    await connectDB();
    const applications = await ApplicationModel.find({ userId });
    const buckets = {
      "0-3 days": 0,
      "4-7 days": 0,
      "1-2 weeks": 0,
      "2-4 weeks": 0,
      "1+ month": 0,
      "No response": 0,
    };

    applications.forEach((app) => {
      if (!app.responseDate) {
        buckets["No response"]++;
        return;
      }

      const diffInDays = differenceInDays(app.responseDate, app.dateApplied);

      if (diffInDays <= 3) buckets["0-3 days"]++;
      else if (diffInDays <= 7) buckets["4-7 days"]++;
      else if (diffInDays <= 14) buckets["1-2 weeks"]++;
      else if (diffInDays <= 28) buckets["2-4 weeks"]++;
      else buckets["1+ month"]++;
    });

    return NextResponse.json(
      Object.entries(buckets).map(([range, count]) => ({ range, count }))
    );
  } catch (error) {
    return new NextResponse("[GET_RESPONSE_TIME_STATS] Internal Server Error");
  }
}
