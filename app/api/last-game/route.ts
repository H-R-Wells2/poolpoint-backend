// app/api/summary/last-game/route.ts
import { connectDB } from "@/lib/mongodb";
import Result from "@/lib/models/result.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const lastGame = await Result.findOne().sort({ date: -1 });

    if (!lastGame) {
      return NextResponse.json({ message: "No games found" }, { status: 404 });
    }

    const sortedPlayers = [...lastGame.players].sort((a, b) => b.score - a.score);
    const winner = sortedPlayers[0]?.playerName || "";

    return NextResponse.json({
      game: {
        _id: lastGame._id,
        date: lastGame.date,
        players: lastGame.players,
      },
      winner,
    });
  } catch (error) {
    console.error("Error fetching last game:", error);
    return NextResponse.json(
      { error: "Failed to fetch last game" },
      { status: 500 }
    );
  }
}
