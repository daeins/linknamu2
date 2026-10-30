import { NextResponse } from "next/server";
import { getClickCounts } from "@/lib/clicks";

export const dynamic = "force-dynamic";

// GET /api/clicks — 링크별 클릭 수 전체 조회
export async function GET() {
  return NextResponse.json(await getClickCounts());
}
