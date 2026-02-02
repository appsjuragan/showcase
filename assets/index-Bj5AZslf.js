(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(s){if(s.ep)return;s.ep=!0;const t=a(s);fetch(s.href,t)}})();const p="appsjuragan";async function f(){try{const[e,i]=await Promise.all([fetch(`https://api.github.com/users/${p}/repos?sort=updated&per_page=100`),fetch(`https://api.github.com/users/${p}/events?per_page=20`)]),a=await e.json(),n=await i.json();m(a),h(n),E(),$()}catch(e){console.error("Error fetching GitHub data:",e),document.querySelector("#repo-grid").innerHTML='<p class="error">Failed to load repositories. Please check your connection.</p>'}}function m(e){const i=document.querySelector("#repo-grid");i.innerHTML="",e.sort((n,s)=>s.stargazers_count-n.stargazers_count).slice(0,12).forEach((n,s)=>{const t=document.createElement("div");t.className="repo-card",t.style.opacity="0",t.style.transform="translateY(20px)",t.style.animation=`fadeInUp 0.6s ${.1*s+.4}s forwards`;const r=n.language||"Plain Text";t.innerHTML=`
      <h3 class="repo-name">${n.name}</h3>
      <div class="tags">
        ${n.topics?n.topics.map(o=>`<span class="tag">${o}</span>`).join(""):""}
        <span class="tag">${n.license?n.license.spdx_id:"MIT"}</span>
      </div>
      <p class="repo-description">${n.description||"No description provided."}</p>
      <div class="repo-meta">
        <div class="repo-lang">
          <span class="lang-dot" style="background-color: ${w(r)}"></span>
          ${r}
        </div>
        <div class="repo-stats">
          <span>⭐ ${n.stargazers_count}</span>
          <span>🍴 ${n.forks_count}</span>
        </div>
      </div>
    `,t.onclick=()=>window.open(n.html_url,"_blank"),i.appendChild(t)})}function h(e){const i=document.querySelector("#activity-list");i.innerHTML="",e.forEach((a,n)=>{const s=document.createElement("div");s.className="activity-item",s.style.opacity="0",s.style.animation=`fadeInRight 0.5s ${.05*n+.2}s forwards`;const t=g(a.type),r=a.repo.name.replace(`${p}/`,""),o=new Date(a.created_at).toLocaleDateString(void 0,{month:"short",day:"numeric"}),d=y(a);s.innerHTML=`
      <div class="activity-icon">${v(a.type)}</div>
      <div class="activity-content">
        <div class="activity-header">
          <span class="activity-type">${t}</span>
          <span class="activity-time">${o}</span>
        </div>
        <span class="activity-repo">${r}</span>
        ${d?`<p class="activity-message">${d}</p>`:""}
      </div>
    `,s.onclick=()=>window.open(`https://github.com/${a.repo.name}`,"_blank"),i.appendChild(s)})}function y(e){return e.type==="PushEvent"&&e.payload.commits&&e.payload.commits.length>0?e.payload.commits[0].message.split(`
`)[0]:e.type==="PullRequestEvent"?e.payload.pull_request.title:e.type==="IssuesEvent"?e.payload.issue.title:e.type==="CreateEvent"?`Created ${e.payload.ref_type} ${e.payload.ref||""}`.trim():e.type==="ReleaseEvent"?e.payload.release.name||e.payload.release.tag_name:null}function g(e){return e.replace("Event","").replace(/([A-Z])/g," $1").trim()}function v(e){return{PushEvent:"🚀",CreateEvent:"✨",WatchEvent:"⭐",ForkEvent:"🍴",IssuesEvent:"🔧",PullRequestEvent:"🔀",DeleteEvent:"🗑️"}[e]||"📝"}function w(e){return{Rust:"#dea584",JavaScript:"#f1e05a",TypeScript:"#3178c6",HTML:"#e34c26",CSS:"#563d7c","C++":"#f34b7d",Python:"#3572A5",Go:"#00ADD8"}[e]||"#8b8b8b"}function E(){const e=document.querySelector(".cursor-follower");document.addEventListener("mousemove",a=>{e.style.left=a.clientX+"px",e.style.top=a.clientY+"px"});const i=document.getElementById("hero-title");if(i){const a=i.innerText;i.innerHTML="",[...a].forEach((n,s)=>{const t=document.createElement("span");t.innerText=n===" "?" ":n,t.className="char",t.style.animationDelay=`${s*.05}s`,i.appendChild(t)})}document.addEventListener("mousemove",a=>{const n=(window.innerWidth/2-a.pageX)/50,s=(window.innerHeight/2-a.pageY)/50,t=document.querySelector(".bg-gradient");t&&(t.style.transform=`translate(${n}px, ${s}px)`)})}function $(){const e=document.getElementById("matrix-canvas");if(!e)return;const i=e.getContext("2d");let a=e.width=window.innerWidth,n=e.height=window.innerHeight;const s="010101011101010101010101010",t=14,r=a/t,o=Array(Math.floor(r)).fill(1);function d(){i.fillStyle="rgba(3, 3, 3, 0.1)",i.fillRect(0,0,a,n),i.font=t+"px monospace";for(let c=0;c<o.length;c++){const l=s.charAt(Math.floor(Math.random()*s.length)),u=Math.random()*.4;i.fillStyle=`rgba(99, 102, 241, ${u})`,i.fillText(l,c*t,o[c]*t),o[c]*t>n&&Math.random()>.975&&(o[c]=0),o[c]++}}setInterval(d,33),window.addEventListener("resize",()=>{a=e.width=window.innerWidth,n=e.height=window.innerHeight;const c=Math.floor(a/t);o.length=0;for(let l=0;l<c;l++)o[l]=1})}document.querySelector("#app").innerHTML=`
  <header>
    <canvas id="matrix-canvas"></canvas>
    <div class="cursor-follower"></div>
    <div class="container">
      <h1 class="hero-title" id="hero-title">Engineering Excellence.</h1>
      <p class="hero-subtitle">Enterprise-grade, security-driven software engineering with a focus on performance and architectural rigor.</p>
      <div class="scroll-indicator"></div>
    </div>
  </header>

  <main class="container">
    <div class="showcase-layout">
      <section class="repos-section">
        <h2 class="section-title">Selected Repositories</h2>
        <div class="repo-grid" id="repo-grid">
          <div class="loading">Fetching repositories...</div>
        </div>
      </section>

      <aside class="activity-section">
        <h2 class="section-title side">Recent Activity</h2>
        <div class="activity-list" id="activity-list">
          <div class="loading">Loading updates...</div>
        </div>
      </aside>
    </div>
  </main>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} <span class="footer-link">appsjuragan</span>. Crafted with passion for performance.</p>
      <p style="margin-top: 1rem; font-size: 0.8rem;">
        View full profile on <a href="https://github.com/appsjuragan" class="footer-link" target="_blank">GitHub</a>
      </p>
    </div>
  </footer>
`;f();
