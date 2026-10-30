"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  initialCount: number;
};

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  function handleClick() {
    setCount((c) => c + 1);
    // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon 우선 사용
    const endpoint = `/api/clicks/${encodeURIComponent(link.id)}`;
    if (!navigator.sendBeacon?.(endpoint)) {
      fetch(endpoint, { method: "POST", keepalive: true }).catch(() => {});
    }
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex w-full flex-col items-center gap-1 rounded-3xl border border-white/70 bg-white/45 px-6 py-5 text-center shadow-[0_4px_24px_-8px_rgba(160,90,40,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_8px_28px_-8px_rgba(160,90,40,0.25)] active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] dark:hover:bg-white/10"
    >
      <p className="w-full truncate text-[17px] font-semibold tracking-tight">{link.title}</p>
      {link.description && (
        <p className="w-full truncate text-sm text-stone-500 dark:text-stone-400">
          {link.description}
        </p>
      )}
      <span className="text-xs tabular-nums text-stone-400 dark:text-stone-500">
        {count.toLocaleString()} 클릭
      </span>
    </a>
  );
}
