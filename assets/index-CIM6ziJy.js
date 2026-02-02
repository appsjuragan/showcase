(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(n){if(n.ep)return;n.ep=!0;const t=o(n);fetch(n.href,t)}})();const p="appsjuragan";async function m(){try{const[e,i]=await Promise.all([fetch(`https://api.github.com/users/${p}/repos?sort=updated&per_page=100`),fetch(`https://api.github.com/users/${p}/events?per_page=20`)]),o=await e.json(),s=await i.json();h(o),g(s),E(),b()}catch(e){console.error("Error fetching GitHub data:",e),document.querySelector("#repo-grid").innerHTML='<p class="error">Failed to load repositories. Please check your connection.</p>'}}function h(e){const i=document.querySelector("#repo-grid");i.innerHTML="",e.sort((s,n)=>n.stargazers_count-s.stargazers_count).slice(0,12).forEach((s,n)=>{const t=document.createElement("div");t.className="repo-card",t.style.opacity="0",t.style.transform="translateY(20px)",t.style.animation=`fadeInUp 0.6s ${.1*n+.4}s forwards`;const r=s.language||"Plain Text";t.innerHTML=`
      <h3 class="repo-name">${s.name}</h3>
      <div class="tags">
        ${s.topics?s.topics.map(a=>`<span class="tag">${a}</span>`).join(""):""}
        <span class="tag">${s.license?s.license.spdx_id:"MIT"}</span>
      </div>
      <p class="repo-description">${s.description||"No description provided."}</p>
      <div class="repo-meta">
        <div class="repo-lang">
          <span class="lang-dot" style="background-color: ${w(r)}"></span>
          ${r}
        </div>
        <div class="repo-stats">
          <span>⭐ ${s.stargazers_count}</span>
          <span>🍴 ${s.forks_count}</span>
        </div>
      </div>
    `,t.onclick=()=>window.open(s.html_url,"_blank"),i.appendChild(t)})}function g(e){const i=document.querySelector("#activity-list");i.innerHTML="",e.forEach((o,s)=>{const n=document.createElement("div");n.className="activity-item",n.style.opacity="0",n.style.animation=`fadeInRight 0.5s ${.05*s+.2}s forwards`;const t=y(o.type),r=o.repo.name.replace(`${p}/`,""),a=new Date(o.created_at).toLocaleDateString(void 0,{month:"short",day:"numeric"}),d=f(o);n.innerHTML=`
      <div class="activity-icon">${v(o.type)}</div>
      <div class="activity-content">
        <div class="activity-header">
          <span class="activity-type">${t}</span>
          <span class="activity-time">${a}</span>
        </div>
        <span class="activity-repo">${r}</span>
        ${d?`<p class="activity-message">${d}</p>`:""}
      </div>
    `,n.onclick=()=>window.open(`https://github.com/${o.repo.name}`,"_blank"),i.appendChild(n)})}function f(e){return e.type==="PushEvent"&&e.payload.commits&&e.payload.commits.length>0?e.payload.commits[0].message.split(`
`)[0]:e.type==="PullRequestEvent"?e.payload.pull_request.title:e.type==="IssuesEvent"?e.payload.issue.title:e.type==="CreateEvent"?`Created ${e.payload.ref_type} ${e.payload.ref||""}`.trim():e.type==="ReleaseEvent"?e.payload.release.name||e.payload.release.tag_name:null}function y(e){return e.replace("Event","").replace(/([A-Z])/g," $1").trim()}function v(e){return{PushEvent:"🚀",CreateEvent:"✨",WatchEvent:"⭐",ForkEvent:"🍴",IssuesEvent:"🔧",PullRequestEvent:"🔀",DeleteEvent:"🗑️"}[e]||"📝"}function w(e){return{Rust:"#dea584",JavaScript:"#f1e05a",TypeScript:"#3178c6",HTML:"#e34c26",CSS:"#563d7c","C++":"#f34b7d",Python:"#3572A5",Go:"#00ADD8"}[e]||"#8b8b8b"}function E(){const e=document.querySelector(".cursor-follower");document.addEventListener("mousemove",o=>{e.style.left=o.clientX+"px",e.style.top=o.clientY+"px"});const i=document.getElementById("hero-title");if(i){const o=i.innerText;i.innerHTML="",[...o].forEach((s,n)=>{const t=document.createElement("span");t.innerText=s===" "?" ":s,t.className="char",t.style.animationDelay=`${n*.05}s`,i.appendChild(t)})}document.addEventListener("mousemove",o=>{const s=(window.innerWidth/2-o.pageX)/50,n=(window.innerHeight/2-o.pageY)/50,t=document.querySelector(".bg-gradient");t&&(t.style.transform=`translate(${s}px, ${n}px)`)})}function b(){const e=document.getElementById("matrix-canvas");if(!e)return;const i=e.getContext("2d");let o=e.width=window.innerWidth,s=e.height=window.innerHeight;const n="010101011101010101010101010",t=14,r=o/t,a=Array(Math.floor(r)).fill(1);function d(){i.fillStyle="rgba(3, 3, 3, 0.1)",i.fillRect(0,0,o,s),i.font=t+"px monospace";for(let c=0;c<a.length;c++){const l=n.charAt(Math.floor(Math.random()*n.length)),u=Math.random()*.4;i.fillStyle=`rgba(99, 102, 241, ${u})`,i.fillText(l,c*t,a[c]*t),a[c]*t>s&&Math.random()>.975&&(a[c]=0),a[c]++}}setInterval(d,33),window.addEventListener("resize",()=>{o=e.width=window.innerWidth,s=e.height=window.innerHeight;const c=Math.floor(o/t);a.length=0;for(let l=0;l<c;l++)a[l]=1})}document.querySelector("#app").innerHTML=`
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
`;m();function $(){const e=document.getElementById("theme-toggle");(localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"))==="light"&&document.documentElement.setAttribute("data-theme","light"),e.addEventListener("click",()=>{document.documentElement.getAttribute("data-theme")==="light"?(document.documentElement.removeAttribute("data-theme"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))})}$();function T(){const e=document.querySelector(".scroll-indicator");let i;const o=5e3;function s(){e.classList.add("visible")}function n(){e.classList.remove("visible")}function t(){n(),clearTimeout(i),i=setTimeout(s,o)}i=setTimeout(s,o),window.addEventListener("scroll",t,{passive:!0})}T();
