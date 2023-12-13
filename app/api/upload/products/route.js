import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const currentDateAndTime = dayjs().format("MM/D/YYYY-H:mm:ss");

  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("public", "images/products/", file.name);
  await writeFile(path, buffer);

  const imgName = file.name;
  return NextResponse.json(imgName);
}
