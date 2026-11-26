// Cloudflare Pages Function: plugin registry + manifest validation. Does not invoke tools.
const REGISTRY=[
 {name:'Web Search',category:'Research',status:'Demo only',tools:['search.query']},
 {name:'Code Runner',category:'Developer',status:'Demo only',tools:['code.execute']},
 {name:'Workspace Files',category:'Utilities',status:'Demo only',tools:['files.list','files.read','files.export']},
 {name:'MCP Connector',category:'Developer',status:'Blueprint',tools:['mcp.discover','mcp.invoke']}
];
// GET /api/plugins — daftar plugin (sebelumnya GET menghasilkan error karena hanya POST yang ada)
export function onRequestGet(){return json({plugins:REGISTRY})}
// Method lain -> 405 yang jelas, bukan 404
export function onRequest(){return json({error:'Method not allowed'},405)}
export async function onRequestPost({request}) {
 try {
  const body=await request.json();
  if(!body||typeof body!=='object'||!Array.isArray(body.tools)) return json({error:'Manifest must include a tools array'},400);
  if(body.tools.length>30) return json({error:'Too many tools (limit 30)'},400);
  const names=new Set();
  for(const t of body.tools){
   if(typeof t.name!=='string'||!/^[a-z0-9_.-]{1,64}$/i.test(t.name)) return json({error:'Invalid tool name'},400);
   if(names.has(t.name)) return json({error:'Duplicate tool name'},400); names.add(t.name);
   if(!t.inputSchema||t.inputSchema.type!=='object') return json({error:`Tool ${t.name} needs an object input schema`},400);
  }
  // This is only a validation endpoint. Tool execution and remote MCP connection are intentionally not implemented.
  return json({valid:true,tools:body.tools.map(t=>({name:t.name,approvalRequired:!!t.approvalRequired}))});
 }catch{return json({error:'Invalid JSON'},400)}
}
function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json','cache-control':'no-store'}})}
