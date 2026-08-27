import type { Config } from "tailwindcss";
export default { content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"], theme:{extend:{fontFamily:{serif:["Georgia","serif"]},colors:{ink:"#090b21",violet:"#7c4dff",gold:"#f8cf72"}}}, plugins:[] } satisfies Config;
