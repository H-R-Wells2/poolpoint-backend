import Result from "@/lib/models/result.model";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const uniqueDateResults = await Result.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    const uniqueDates = uniqueDateResults.map((d) => d._id);

    return NextResponse.json({ data: uniqueDates });
  } catch (error) {
    console.error("Error fetching unique dates:", error);
    return NextResponse.json({ error: "Failed to fetch unique dates" }, { status: 500 });
  }
}
