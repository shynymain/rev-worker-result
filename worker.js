export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "") return Response.json({ ok:true, service:"Rev Results Worker v3", endpoint:"/api/results" });
    if (url.pathname !== "/api/results") return Response.json({ ok:false, error:"not found" }, {status:404});
    const raceId = url.searchParams.get("raceId") || "sample";
    const seed = hash(raceId);
    const a = seed % 16 + 1;
    const b = (seed*3) % 16 + 1;
    const c = (seed*7) % 16 + 1;
    const nums = [...new Set([a,b,c,5,14])].slice(0,3);
    const result = { firstNo:String(nums[0]), secondNo:String(nums[1]), thirdNo:String(nums[2]), umarenNumbers:[String(nums[0]),String(nums[1])], sanrenpukuNumbers:nums.map(String), umarenPay:String(800 + (seed%60)*100), sanrenpukuPay:String(1800 + (seed%120)*100) };
    return json({ ok:true, raceId, result });
  }
};
function hash(s){let h=0; for(const ch of s) h=(h*31+ch.charCodeAt(0))>>>0; return h;}
function json(obj){return new Response(JSON.stringify(obj),{headers:{"content-type":"application/json; charset=utf-8","access-control-allow-origin":"*"}})}
