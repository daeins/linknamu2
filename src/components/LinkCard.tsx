import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  count: number;
  onClick: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  // mailto를 새 탭으로 열면 메일 앱이 없을 때 빈 탭만 남아서 현재 탭에서 엽니다.
  const isMail = link.url.startsWith("mailto:");

  return (
    <a
      href={link.url}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      onClick={onClick}
      className="relative flex w-full flex-col items-center gap-1 rounded-3xl border border-white/70 bg-white/45 px-16 py-5 text-center shadow-[0_4px_24px_-8px_rgba(160,90,40,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_8px_28px_-8px_rgba(160,90,40,0.25)] active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] dark:hover:bg-white/10"
    >
      <p className="w-full truncate text-[17px] font-semibold tracking-tight">{link.title}</p>
      {link.description && (
        <p className="w-full truncate text-sm text-stone-500 dark:text-stone-400">
          {link.description}
        </p>
      )}
      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs tabular-nums text-stone-400 dark:text-stone-500">
        {count.toLocaleString()}회
      </span>
    </a>
  );
}
