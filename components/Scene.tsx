import type { CSSProperties } from "react";

export function Scene(){return <div className="mystic-bg" aria-hidden>{Array.from({length:34},(_,i)=><i key={i} className="star" style={{left:`${(i*37)%100}%`,top:`${(i*61)%92}%`,"--d":`${2+i%5}s`} as CSSProperties}/>)}</div>}
