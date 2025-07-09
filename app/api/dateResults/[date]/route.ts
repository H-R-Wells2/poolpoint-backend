import { NextRequest, NextResponse } from "next/server";
import Result from "@/lib/models/result.model";
import { connectDB } from "@/lib/mongodb";
import moment from "moment-timezone";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  try {
    await connectDB();

    const { date } = await params;

    if (!date) {
      return NextResponse.json({ error: "Missing date param" }, { status: 400 });
    }

    const momentDate = moment.tz(date, "Asia/Kolkata");

    const startOfDay = momentDate.startOf("day").toDate();
    const endOfDay = momentDate.endOf("day").toDate();

    const results = await Result.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ date: -1 });

    return NextResponse.json({ data: results });
  } catch (error) {
    console.error("Error fetching results by date:", error);
    return NextResponse.json({ error: "Failed to fetch results" }, { status: 500 });
  }
}
