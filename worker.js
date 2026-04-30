const headers={"content-type":"application/json; charset=utf-8","access-control-allow-origin":"*","access-control-allow-methods":"GET,POST,OPTIONS","access-control-allow-headers":"content-type"};
const json=(x,status=200)=>new Response(JSON.stringify(x,null,2),{status,headers});
const DATA={ok:true,source:"rev-results-realdata-json",updatedAt:new Date().toISOString(),races:[
  {race:{date:"2026/4/25",place:"東京",raceNo:"8",raceName:"東京8R 実データ枠"},result:{firstNo:"1",secondNo:"5",thirdNo:"9",umaren:"1-5",umarenPay:1200,sanrenpuku:"1-5-9",sanrenpukuPay:3500}}
]};
export default{async fetch(request){const url=new URL(request.url);if(request.method==="OPTIONS")return json({ok:true});if(url.pathname==="/api/results")return json(DATA);return json({ok:false,error:"use /api/results",races:[]},404)}};
