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
      className="flex w-full flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-gray-800 dark:bg-gray-900"
    >
      <p className="w-full truncate font-semibold">{link.title}</p>
      {link.description && (
        <p className="w-full truncate text-sm text-gray-500 dark:text-gray-400">
          {link.description}
        </p>
      )}
      <span className="text-xs text-gray-400 dark:text-gray-500">
        {count.toLocaleString()} 클릭
      </span>
    </a>
  );
}
