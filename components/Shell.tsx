import { Scene } from "./Scene";
export function Shell({children}:{children:React.ReactNode}){return <main className="min-h-screen px-4 py-7 sm:px-8"><Scene/><div className="mx-auto max-w-6xl">{children}</div></main>}
export const Back=({onClick}:{onClick:()=>void})=><button onClick={onClick} className="text-xs tracking-[.2em] text-[#d9c89b] hover:text-white">← ĐẠI SẢNH</button>;
