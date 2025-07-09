import Result from "@/lib/models/result.model";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const result = await Result.findById(params.id);

  if (!result) {
    return NextResponse.json({ message: "Result not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();

  const updated = await Result.findByIdAndUpdate(params.id, data, { new: true });

  if (!updated) {
    return NextResponse.json({ message: "Result not found for update" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  const deleted = await Result.findByIdAndDelete(params.id);

  if (!deleted) {
    return NextResponse.json({ message: "Result not found for deletion" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted" });
}
