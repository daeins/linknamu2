import { MongoClient, type Db } from "mongodb";

declare global {
  // 개발 모드 HMR 시 연결이 계속 늘어나지 않도록 전역에 캐시
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// MONGODB_URI가 없으면 null을 반환해 DB 없이도 페이지가 동작하게 합니다.
export async function getDb(): Promise<Db | null> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect().catch((error) => {
      // 실패한 연결은 캐시하지 않아 다음 요청에서 재시도
      global._mongoClientPromise = undefined;
      throw error;
    });
  }

  const client = await global._mongoClientPromise;
  return client.db(process.env.MONGODB_DB ?? "linknamu");
}
