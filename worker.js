const headers={"content-type":"application/json;charset=utf-8","access-control-allow-origin":"*","access-control-allow-methods":"GET,POST,OPTIONS","access-control-allow-headers":"content-type"};
function pad(n){return String(n).padStart(2,"0")}
function fmt(d){return `${d.getFullYear()}/${pad(d.getMonth()+1)}/${pad(d.getDate())}`}
function nextWeekend(base=new Date()){const jst=new Date(base.toLocaleString("en-US",{timeZone:"Asia/Tokyo"}));const day=jst.getDay();let sat=new Date(jst);sat.setHours(0,0,0,0);sat.setDate(jst.getDate()+((6-day+7)%7));let sun=new Date(sat);sun.setDate(sat.getDate()+1);return [sat,sun]}
function sampleResults(d){return [];}
export default{async fetch(req){if(req.method==="OPTIONS")return new Response("{}",{headers});const url=new URL(req.url);const q=url.searchParams.get("date");const dates=q?[new Date(q.replace(/\//g,"-"))]:nextWeekend();return new Response(JSON.stringify({ok:true,races:dates.flatMap(sampleResults),message:"レース結果は確定後に取得・反映してください。未確定時は空配列を返します。"}),{headers})}};
