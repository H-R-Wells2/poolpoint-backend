import Result from "@/lib/models/result.model";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const result = await Result.findById(id);

  if (!result) {
    return NextResponse.json({ message: "Result not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const data = await request.json();

  const { id } = await params;

  const updated = await Result.findByIdAndUpdate(id, data, { new: true });

  if (!updated) {
    return NextResponse.json({ message: "Result not found for update" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const deleted = await Result.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json({ message: "Result not found for deletion" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted" });
}
