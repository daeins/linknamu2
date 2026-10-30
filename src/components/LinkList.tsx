"use client";

import { useEffect, useRef, useState } from "react";
import type { LinkItem } from "@/data/profile";
import LinkCard from "./LinkCard";
import Toast from "./Toast";

// 보안 컨텍스트(https, localhost)가 아니면 Clipboard API가 없어 예전 방식으로 대신 복사
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return ok;
  }
}

type Props = {
  links: LinkItem[];
};

export default function LinkList({ links }: Props) {
  // 데이터를 받기 전에는 0회로 표시. 서버 값과 이 화면에서 누른 횟수를 따로 두어
  // 응답이 늦게 오거나 두 번 와도(개발 모드 StrictMode) 클릭이 사라지거나 중복되지 않습니다.
  const [serverCounts, setServerCounts] = useState<Record<string, number>>({});
  const [localClicks, setLocalClicks] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  function showToast(message: string) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  }

  useEffect(() => {
    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : {}))
      .then((data: Record<string, number>) => setServerCounts(data))
      .catch(() => {});
  }, []);

  function handleClick({ id, url }: LinkItem) {
    // mailto 링크는 주소를 복사해 두고, 기본 이동으로 메일 앱이 있으면 열리게 둡니다.
    if (url.startsWith("mailto:")) {
      const email = decodeURIComponent(url.slice("mailto:".length).split("?")[0]);
      copyText(email).then((ok) =>
        showToast(ok ? "이메일 주소가 복사되었습니다" : `이메일 주소: ${email}`),
      );
    }

    setLocalClicks((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    // 새 탭으로 이동해도 요청이 끊기지 않도록 sendBeacon 우선 사용
    const endpoint = `/api/clicks/${encodeURIComponent(id)}`;
    if (!navigator.sendBeacon?.(endpoint)) {
      fetch(endpoint, { method: "POST", keepalive: true }).catch(() => {});
    }
  }

  return (
    <>
      <ul className="mt-12 flex w-full flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard
              link={link}
              count={(serverCounts[link.id] ?? 0) + (localClicks[link.id] ?? 0)}
              onClick={() => handleClick(link)}
            />
          </li>
        ))}
      </ul>
      <Toast message={toast} />
    </>
  );
}
