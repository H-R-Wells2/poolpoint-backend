import Result from "@/lib/models/result.model";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const skip = (page - 1) * limit;

  const total = await Result.countDocuments();
  const results = await Result.find()
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  return NextResponse.json({
    data: results,
    page,
    totalPages: Math.ceil(total / limit),
    totalResults: total,
  });
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  const createdResult = await Result.create(data);
  return NextResponse.json(createdResult, { status: 201 });
}
