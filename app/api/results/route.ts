import Result from "@/lib/models/result.model";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  const searchParams = req.nextUrl.searchParams;
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = limitParam ? parseInt(limitParam, 10) : null;

  const skip = limit ? (page - 1) * limit : 0;

  const total = await Result.countDocuments();

  let query = Result.find().sort({ date: -1 });

  if (limit) {
    query = query.skip(skip).limit(limit);
  }

  const results = await query;

  return NextResponse.json({
    data: results,
    page,
    totalPages: limit ? Math.ceil(total / limit) : 1,
    totalResults: total,
  });
}

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  const createdResult = await Result.create(data);
  return NextResponse.json(createdResult, { status: 201 });
}
