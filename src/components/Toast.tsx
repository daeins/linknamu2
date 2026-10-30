type Props = {
  message: string | null;
};

// 화면 아래쪽에 잠깐 떴다 사라지는 안내 문구. 스크린 리더도 읽도록 aria-live 사용
export default function Toast({ message }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-8 z-50 flex justify-center px-6 transition duration-300 ease-out ${
        message ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      {message && (
        <p className="rounded-full border border-white/70 bg-white/70 px-5 py-2.5 text-sm font-medium text-stone-700 shadow-[0_8px_28px_-8px_rgba(160,90,40,0.3)] backdrop-blur-xl dark:border-white/10 dark:bg-stone-800/80 dark:text-stone-100">
          {message}
        </p>
      )}
    </div>
  );
}
