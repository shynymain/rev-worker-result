const cors = {"access-control-allow-origin":"*","access-control-allow-methods":"GET,POST,OPTIONS","access-control-allow-headers":"content-type"};
function json(data){ return new Response(JSON.stringify(data,null,2),{headers:{"content-type":"application/json;charset=utf-8",...cors}}); }
const sample = {result:{first:2,second:5,third:1,umarenPay:1240,sanrenPay:3820}};
export default { async fetch(req){ if(req.method==="OPTIONS") return new Response(null,{headers:cors}); if(req.method==="GET") return json(sample); if(req.method==="POST"){ const body=await req.json().catch(()=>({})); return json({ok:true,saved:body}); } return json({ok:false,error:"method not allowed"}); }};
