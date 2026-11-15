// Run at source refresh time; never publish private repositories or credentials.
const fs=require('node:fs'),path=require('node:path');
(async()=>{
 const response=await fetch('https://api.github.com/orgs/VertexCorporation/repos?type=public&per_page=100',{headers:{Accept:'application/vnd.github+json','User-Agent':'vertex-public-catalogue'},signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw Error('Public GitHub directory unavailable: '+response.status);
 const data=await response.json();if(!Array.isArray(data))throw Error('Invalid public directory');
 const ignored=['vertexite','cozmosite','cortexite','allyishere','eventsite'];
 const repositories=data.filter(r=>r.private===false&&r.visibility==='public'&&!r.archived&&r.owner?.login==='VertexCorporation'&&!ignored.includes(r.name.toLowerCase())).map(r=>({name:r.name,description:r.description||'',language:r.language||'Other',stars:r.stargazers_count,forks:r.forks_count,url:r.html_url})).sort((a,b)=>b.stars-a.stars);
 if(!repositories.length)throw Error('Refusing to replace the public catalogue with an empty result');
 fs.writeFileSync(path.resolve(__dirname,'../assets/data/public-repositories.json'),JSON.stringify({schemaVersion:1,repositories},null,2)+'\n');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
