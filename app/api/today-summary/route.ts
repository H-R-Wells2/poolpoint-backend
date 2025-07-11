import { connectDB } from "@/lib/mongodb";
import Result from "@/lib/models/result.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  try {
    const results = await Result.find({ date: { $gte: start, $lt: end } });

    const gamesPlayed = results.length;

    let totalPaid = 0;
    const scoreMap: Record<string, number> = {};

    for (const game of results) {
      for (const player of game.players) {
        totalPaid += player.amount || 0;
        scoreMap[player.playerName] = (scoreMap[player.playerName] || 0) + player.score;
      }
    }

    const topPlayer =
      Object.entries(scoreMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

    return NextResponse.json({
      gamesPlayed,
      totalPaid,
      topPlayer,
    });
  } catch (error) {
    console.error("Error in today's summary:", error);
    return NextResponse.json(
      { error: "Failed to fetch today's summary" },
      { status: 500 }
    );
  }
}
