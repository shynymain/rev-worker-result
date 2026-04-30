export default {
  async fetch(request) {
    const headers = cors();
    if (request.method === 'OPTIONS') return new Response('ok', { headers });
    const url = new URL(request.url);
    if (url.pathname !== '/api/results') return json({ ok:false, error:'not found', path:url.pathname }, 404, headers);
    const history = url.searchParams.get('history') === '1';
    const races = history ? sampleHistory() : [];
    return json({ ok:true, source:'worker-results', count:races.length, races }, 200, headers);
  }
}
function cors(){return {'content-type':'application/json; charset=utf-8','access-control-allow-origin':'*','access-control-allow-methods':'GET,POST,OPTIONS','access-control-allow-headers':'content-type'};}
function json(data,status=200,headers=cors()){return new Response(JSON.stringify(data,null,2),{status,headers});}
function sampleHistory(){
  const races=[];
  for(let i=1;i<=20;i++){
    const horses=Array.from({length:18},(_,n)=>({no:String(n+1),frame:String(Math.ceil((n+1)/2.25)),name:`サンプル${n+1}`,last1:String((n%9)+1),last2:String(((n+3)%9)+1),last3:String(((n+6)%9)+1),odds:String((2+n*0.7).toFixed(1))}));
    races.push({date:`2025-${String((i%12)+1).padStart(2,'0')}-${String((i%27)+1).padStart(2,'0')}`,place:['東京','中山','京都','阪神'][i%4],raceNo:String((i%5)+8),raceName:`過去サンプル${i}`,grade:['G1','G2','G3','OP特別','3勝'][i%5],surface:'芝',condition:i%4===0?'ハンデ':'定量',headcount:'18',horses,result:{firstNo:String((i%18)+1),secondNo:String(((i+4)%18)+1),thirdNo:String(((i+8)%18)+1),umarenPay:1200+i*80,sanrenPay:4500+i*160}});
  }
  return races;
}
