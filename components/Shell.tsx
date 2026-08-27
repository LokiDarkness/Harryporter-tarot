import type { ReactNode } from "react";
import { Scene } from "./Scene";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen px-4 py-7 sm:px-8">
      <Scene />
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}

export function Back({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-xs tracking-[.2em] text-[#d9c89b] hover:text-white">
      ← ĐẠI SẢNH
    </button>
  );
}
