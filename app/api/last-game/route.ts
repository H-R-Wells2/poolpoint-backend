import { connectDB } from "@/lib/mongodb";
import Result from "@/lib/models/result.model";
import { NextResponse } from "next/server";

type Player = {
  playerName: string;
  score: number;
  amount?: number;
  isTeamWon?: boolean;
};

export async function GET() {
  await connectDB();

  try {
    const lastGame = await Result.findOne().sort({ date: -1 });

    if (!lastGame) {
      return NextResponse.json({ message: "No games found" }, { status: 404 });
    }

    let winner: string | string[] = "";

    const players: Player[] = lastGame.players as Player[];

    const isTeamGame = players.some((p: Player) => typeof p.isTeamWon === "boolean");

    if (isTeamGame) {
      const teamWinners = players
        .filter((p: Player) => p.isTeamWon === true)
        .map((p: Player) => p.playerName);
      winner = teamWinners;
    } else {
      const sortedPlayers = [...players].sort(
        (a: Player, b: Player) => b.score - a.score
      );
      winner = sortedPlayers[0]?.playerName || "";
    }

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
