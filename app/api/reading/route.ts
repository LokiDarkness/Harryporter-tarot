import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
const LIMIT = 12_000;
export async function POST(req:NextRequest){
  try { const key=process.env.GEMINI_API_KEY; if(!key) return NextResponse.json({error:"Quả cầu đang bị màn sương che phủ. Xin hãy thử lại sau."},{status:503});
    const body=await req.json() as {prompt?:string}; if(!body.prompt || body.prompt.length>8000) return NextResponse.json({error:"Lời thỉnh cầu chưa hợp lệ."},{status:400});
    const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),LIMIT);
    const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:body.prompt}]}],generationConfig:{temperature:.85,maxOutputTokens:1000}}),signal:controller.signal}); clearTimeout(timer);
    if(!response.ok) throw new Error("Gemini unavailable"); const data=await response.json() as {candidates?:{content?:{parts?:{text?:string}[]}}[]}; const text=data.candidates?.[0]?.content?.parts?.map(p=>p.text??"").join("").trim(); if(!text) throw new Error("Empty reply");
    return NextResponse.json({text});
  } catch { return NextResponse.json({error:"Màn sương đang quá dày. Xin hãy thử lại sau ít phút."},{status:502}); }
}
