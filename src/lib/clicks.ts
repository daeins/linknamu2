import { getDb } from "./mongodb";

type ClickDoc = { _id: string; count: number };

const COLLECTION = "clicks";

export async function getClickCounts(): Promise<Record<string, number>> {
  try {
    const db = await getDb();
    if (!db) return {};
    const docs = await db.collection<ClickDoc>(COLLECTION).find().toArray();
    return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return {};
  }
}

export async function incrementClick(id: string): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .collection<ClickDoc>(COLLECTION)
    .findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
  return result?.count ?? null;
}
