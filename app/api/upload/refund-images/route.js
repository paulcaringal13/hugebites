import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import dayjs from "dayjs";

export async function POST(request) {
  const currentDateAndTime = dayjs().format("MM/D/YYYY-H:mm:ss");

  const data = await request.formData();
  const file = data.get("file");

  let name = file.name;

  let fileType = name.split(".");
  let imageName = `${currentDateAndTime}.${fileType[1]}`;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("public", "refund-images", file.name);
  await writeFile(path, buffer);

  const imgName = file.name;
  return NextResponse.json(imgName);
}
