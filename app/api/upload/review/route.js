import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("public", "review", file.name);
  await writeFile(path, buffer);

  const imgName = file.name;
  return NextResponse.json(imgName);
}
