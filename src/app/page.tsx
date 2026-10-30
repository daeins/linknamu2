import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";
import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import ThemeToggle from "@/components/ThemeToggle";

export const dynamic = "force-dynamic";

// wireframe.png 구조: 원형 프로필 사진 → 이름 → 한 줄 소개 → 링크 카드 목록(세로)
export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 pb-10 pt-20 sm:pt-24">
      <div className="fixed right-5 top-5">
        <ThemeToggle />
      </div>

      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

      <LinkList links={profile.links} initialCounts={counts} />

      <footer className="mt-auto pt-16 text-xs tracking-wide text-stone-400 dark:text-stone-500">
        🌳 링크나무
      </footer>
    </main>
  );
}
