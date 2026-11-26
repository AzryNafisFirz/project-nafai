// Tes logika Functions tanpa perlu wrangler.
import * as plugins from '../functions/api/plugins.js';
import * as health from '../functions/api/health.js';
import { strict as a } from 'node:assert';
const post=b=>plugins.onRequestPost({request:new Request('http://x/api/plugins',{method:'POST',body:typeof b==='string'?b:JSON.stringify(b)})});
a.equal((await health.onRequestGet()).status,200);
const g=await plugins.onRequestGet(); a.equal(g.status,200); a.equal((await g.json()).plugins.length,4);
a.equal((await post({tools:[{name:'a.b',inputSchema:{type:'object'}}]})).status,200);
a.equal((await post({})).status,400);
a.equal((await post('bukan json')).status,400);
a.equal((await post({tools:[{name:'x',inputSchema:{type:'object'}},{name:'x',inputSchema:{type:'object'}}]})).status,400);
a.equal(plugins.onRequest().status,405);
console.log('Semua tes lulus');
