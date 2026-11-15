const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('docs catalogue loads from same-origin and escapes repository text before rendering',async()=>{
 const sandbox={fetch:async url=>{assert.equal(url,'/assets/data/public-repositories.json');return {ok:true,json:async()=>({schemaVersion:1,repositories:[{name:'Example',url:'https://github.com/VertexCorporation/Example'},{name:'Bad',url:'javascript:bad'}]})};}};
 vm.createContext(sandbox);vm.runInContext(fs.readFileSync('fetch_repos.js','utf8'),sandbox);
 assert.equal((await sandbox.fetchRepos()).length,1);
 const html=sandbox.createRepoCard({name:'<img onerror=bad>',description:'<script>bad</script>',url:'https://github.com/VertexCorporation/Example',language:'Other',stars:1,forks:2});
 assert(!html.includes('<script>'));assert(html.includes('&lt;script&gt;'));
 sandbox.fetch=async()=>{throw Error('offline')};assert.equal((await sandbox.fetchRepos()).length,0);
});
test('public snapshot contains only fixed GitHub organization addresses and a supported schema',()=>{
 const data=JSON.parse(fs.readFileSync('assets/data/public-repositories.json','utf8'));assert.equal(data.schemaVersion,1);assert(data.repositories.length>0);
 for(const repo of data.repositories){assert.match(repo.url,/^https:\/\/github\.com\/VertexCorporation\/[A-Za-z0-9_.-]+$/);assert.deepEqual(Object.keys(repo).sort(),['description','forks','language','name','stars','url']);}
});
