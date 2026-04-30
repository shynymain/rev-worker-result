const headers={"content-type":"application/json;charset=utf-8","access-control-allow-origin":"*","access-control-allow-methods":"GET,POST,OPTIONS","access-control-allow-headers":"content-type"};
function json(data){return new Response(JSON.stringify(data),{headers})}
export default{async fetch(req){
  if(req.method==="OPTIONS")return new Response("{}",{headers});
  // 本番ではJRA払戻ページ/結果ページのHTML解析をここへ追加する。
  // 未確定レースが多いため、空配列を正常返却してフロントの履歴保存を妨げない。
  return json({ok:true,source:"results-placeholder",races:[],message:"結果は未確定または未実装です。画面から手入力すると履歴に保存されます。"});
}};