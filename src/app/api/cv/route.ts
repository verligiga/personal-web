import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cv = await prisma.cV.findFirst();
  if (!cv) {
    return NextResponse.json({ error: "No CV found" }, { status: 404 });
  }

  const fileResponse = await fetch(cv.fileUrl);
  if (!fileResponse.ok || !fileResponse.body) {
    return NextResponse.json({ error: "Failed to fetch CV file" }, { status: 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", "application/pdf");
  headers.set("Content-Disposition", `attachment; filename="${cv.fileName}"`);
  const contentLength = fileResponse.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  return new NextResponse(fileResponse.body, { headers });
}
