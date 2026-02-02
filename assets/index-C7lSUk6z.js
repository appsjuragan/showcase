(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=o(t);fetch(t.href,n)}})();const p="appsjuragan";async function m(){try{const[e,i]=await Promise.all([fetch(`https://api.github.com/users/${p}/repos?sort=updated&per_page=100`),fetch(`https://api.github.com/users/${p}/events?per_page=20`)]),o=await e.json(),s=await i.json();h(o),g(s),E(),b()}catch(e){console.error("Error fetching GitHub data:",e),document.querySelector("#repo-grid").innerHTML='<p class="error">Failed to load repositories. Please check your connection.</p>'}}function h(e){const i=document.querySelector("#repo-grid");i.innerHTML="",e.sort((s,t)=>t.stargazers_count-s.stargazers_count).slice(0,12).forEach((s,t)=>{const n=document.createElement("div");n.className="repo-card",n.style.opacity="0",n.style.transform="translateY(20px)",n.style.animation=`fadeInUp 0.6s ${.1*t+.4}s forwards`;const c=s.language||"Plain Text";n.innerHTML=`
      <h3 class="repo-name">${s.name}</h3>
      <div class="tags">
        ${s.topics?s.topics.map(a=>`<span class="tag">${a}</span>`).join(""):""}
        <span class="tag">${s.license?s.license.spdx_id:"MIT"}</span>
      </div>
      <p class="repo-description">${s.description||"No description provided."}</p>
      <div class="repo-meta">
        <div class="repo-lang">
          <span class="lang-dot" style="background-color: ${w(c)}"></span>
          ${c}
        </div>
        <div class="repo-stats">
          <span>⭐ ${s.stargazers_count}</span>
          <span>🍴 ${s.forks_count}</span>
        </div>
      </div>
    `,n.onclick=()=>window.open(s.html_url,"_blank"),i.appendChild(n)})}function g(e){const i=document.querySelector("#activity-list");i.innerHTML="",e.forEach((o,s)=>{const t=document.createElement("div");t.className="activity-item",t.style.opacity="0",t.style.animation=`fadeInRight 0.5s ${.05*s+.2}s forwards`;const n=y(o.type),c=o.repo.name.replace(`${p}/`,""),a=new Date(o.created_at).toLocaleDateString(void 0,{month:"short",day:"numeric"}),l=f(o);t.innerHTML=`
      <div class="activity-icon">${v(o.type)}</div>
      <div class="activity-content">
        <div class="activity-header">
          <span class="activity-type">${n}</span>
          <span class="activity-time">${a}</span>
        </div>
        <span class="activity-repo">${c}</span>
        ${l?`<p class="activity-message">${l}</p>`:""}
      </div>
    `,t.onclick=()=>window.open(`https://github.com/${o.repo.name}`,"_blank"),i.appendChild(t)})}function f(e){return e.type==="PushEvent"&&e.payload.commits&&e.payload.commits.length>0?e.payload.commits[0].message.split(`
`)[0]:e.type==="PullRequestEvent"?e.payload.pull_request.title:e.type==="IssuesEvent"?e.payload.issue.title:e.type==="CreateEvent"?`Created ${e.payload.ref_type} ${e.payload.ref||""}`.trim():e.type==="ReleaseEvent"?e.payload.release.name||e.payload.release.tag_name:null}function y(e){return e.replace("Event","").replace(/([A-Z])/g," $1").trim()}function v(e){return{PushEvent:"🚀",CreateEvent:"✨",WatchEvent:"⭐",ForkEvent:"🍴",IssuesEvent:"🔧",PullRequestEvent:"🔀",DeleteEvent:"🗑️"}[e]||"📝"}function w(e){return{Rust:"#dea584",JavaScript:"#f1e05a",TypeScript:"#3178c6",HTML:"#e34c26",CSS:"#563d7c","C++":"#f34b7d",Python:"#3572A5",Go:"#00ADD8"}[e]||"#8b8b8b"}function E(){const e=document.querySelector(".cursor-follower");document.addEventListener("mousemove",o=>{e.style.left=o.clientX+"px",e.style.top=o.clientY+"px"});const i=document.getElementById("hero-title");if(i){const o=i.innerText;i.innerHTML="";let s=0;const t=o.split(" ");t.forEach((n,c)=>{const a=document.createElement("span");a.className="word",[...n].forEach(l=>{const r=document.createElement("span");r.innerText=l,r.className="char",r.style.animationDelay=`${s*.05}s`,a.appendChild(r),s++}),i.appendChild(a),c<t.length-1&&(i.appendChild(document.createTextNode(" ")),s++)})}document.addEventListener("mousemove",o=>{const s=(window.innerWidth/2-o.pageX)/50,t=(window.innerHeight/2-o.pageY)/50,n=document.querySelector(".bg-gradient");n&&(n.style.transform=`translate(${s}px, ${t}px)`)})}function b(){const e=document.getElementById("matrix-canvas");if(!e)return;const i=e.getContext("2d");let o=e.width=window.innerWidth,s=e.height=window.innerHeight;const t="010101011101010101010101010",n=14,c=o/n,a=Array(Math.floor(c)).fill(1);function l(){i.fillStyle="rgba(3, 3, 3, 0.1)",i.fillRect(0,0,o,s),i.font=n+"px monospace";for(let r=0;r<a.length;r++){const d=t.charAt(Math.floor(Math.random()*t.length)),u=Math.random()*.4;i.fillStyle=`rgba(99, 102, 241, ${u})`,i.fillText(d,r*n,a[r]*n),a[r]*n>s&&Math.random()>.975&&(a[r]=0),a[r]++}}setInterval(l,33),window.addEventListener("resize",()=>{o=e.width=window.innerWidth,s=e.height=window.innerHeight;const r=Math.floor(o/n);a.length=0;for(let d=0;d<r;d++)a[d]=1})}document.querySelector("#app").innerHTML=`
  <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Theme">
    <span class="sun-icon">☀️</span>
    <span class="moon-icon">🌙</span>
  </button>
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
`;m();function $(){const e=document.getElementById("theme-toggle");(localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"))==="light"&&document.documentElement.setAttribute("data-theme","light"),e.addEventListener("click",()=>{document.documentElement.getAttribute("data-theme")==="light"?(document.documentElement.removeAttribute("data-theme"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))})}$();function T(){const e=document.querySelector(".scroll-indicator");let i;const o=5e3;function s(){e.classList.add("visible")}function t(){e.classList.remove("visible")}function n(){t(),clearTimeout(i),i=setTimeout(s,o)}i=setTimeout(s,o),window.addEventListener("scroll",n,{passive:!0})}T();
