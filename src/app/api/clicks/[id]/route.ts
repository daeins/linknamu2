import { NextResponse } from "next/server";
import { incrementClick } from "@/lib/clicks";
import { profile } from "@/data/profile";

// POST /api/clicks/:id — 해당 링크의 클릭 수 1 증가
export async function POST(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const exists = profile.links.some((link) => link.id === params.id);
  if (!exists) {
    return NextResponse.json({ error: "존재하지 않는 링크" }, { status: 404 });
  }

  try {
    const count = await incrementClick(params.id);
    return NextResponse.json({ id: params.id, count });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "저장 실패" }, { status: 500 });
  }
}
