import"./style-BIdh1XTz.js";const p="appsjuragan";async function u(){try{const[e,n]=await Promise.all([fetch(`https://api.github.com/users/${p}/repos?sort=updated&per_page=100`),fetch(`https://api.github.com/users/${p}/events?per_page=20`)]),s=await e.json(),t=await n.json();h(s),g(t),E(),b()}catch(e){console.error("Error fetching GitHub data:",e),document.querySelector("#repo-grid").innerHTML='<p class="error">Failed to load repositories. Please check your connection.</p>'}}function h(e){const n=document.querySelector("#repo-grid");n.innerHTML="",e.sort((t,i)=>i.stargazers_count-t.stargazers_count).slice(0,12).forEach((t,i)=>{const a=document.createElement("div");a.className="repo-card",a.style.opacity="0",a.style.transform="translateY(20px)",a.style.animation=`fadeInUp 0.6s ${.1*i+.4}s forwards`;const r=t.language||"Plain Text";a.innerHTML=`
      <h3 class="repo-name">${t.name}</h3>
      <div class="tags">
        ${t.topics?t.topics.map(o=>`<span class="tag">${o}</span>`).join(""):""}
        <span class="tag">${t.license?t.license.spdx_id:"MIT"}</span>
      </div>
      <p class="repo-description">${t.description||"No description provided."}</p>
      <div class="repo-meta">
        <div class="repo-lang">
          <span class="lang-dot" style="background-color: ${w(r)}"></span>
          ${r}
        </div>
        <div class="repo-stats">
          <span>⭐ ${t.stargazers_count}</span>
          <span>🍴 ${t.forks_count}</span>
        </div>
      </div>
    `,a.onclick=()=>{t.name==="diskOfflaner-rust"?window.location.href="/showcase/diskofflaner/":window.open(t.html_url,"_blank")},n.appendChild(a)})}function g(e){const n=document.querySelector("#activity-list");n.innerHTML="",e.forEach((s,t)=>{const i=document.createElement("div");i.className="activity-item",i.style.opacity="0",i.style.animation=`fadeInRight 0.5s ${.05*t+.2}s forwards`;const a=y(s.type),r=s.repo.name.replace(`${p}/`,""),o=new Date(s.created_at).toLocaleDateString(void 0,{month:"short",day:"numeric"}),l=f(s);i.innerHTML=`
      <div class="activity-icon">${v(s.type)}</div>
      <div class="activity-content">
        <div class="activity-header">
          <span class="activity-type">${a}</span>
          <span class="activity-time">${o}</span>
        </div>
        <span class="activity-repo">${r}</span>
        ${l?`<p class="activity-message">${l}</p>`:""}
      </div>
    `,i.onclick=()=>window.open(`https://github.com/${s.repo.name}`,"_blank"),n.appendChild(i)})}function f(e){return e.type==="PushEvent"&&e.payload.commits&&e.payload.commits.length>0?e.payload.commits[0].message.split(`
`)[0]:e.type==="PullRequestEvent"?e.payload.pull_request.title:e.type==="IssuesEvent"?e.payload.issue.title:e.type==="CreateEvent"?`Created ${e.payload.ref_type} ${e.payload.ref||""}`.trim():e.type==="ReleaseEvent"?e.payload.release.name||e.payload.release.tag_name:null}function y(e){return e.replace("Event","").replace(/([A-Z])/g," $1").trim()}function v(e){return{PushEvent:"🚀",CreateEvent:"✨",WatchEvent:"⭐",ForkEvent:"🍴",IssuesEvent:"🔧",PullRequestEvent:"🔀",DeleteEvent:"🗑️"}[e]||"📝"}function w(e){return{Rust:"#dea584",JavaScript:"#f1e05a",TypeScript:"#3178c6",HTML:"#e34c26",CSS:"#563d7c","C++":"#f34b7d",Python:"#3572A5",Go:"#00ADD8"}[e]||"#8b8b8b"}function E(){const e=document.querySelector(".cursor-follower");document.addEventListener("mousemove",s=>{e.style.left=s.clientX+"px",e.style.top=s.clientY+"px"});const n=document.getElementById("hero-title");if(n){const s=n.innerText;n.innerHTML="";let t=0;const i=s.split(" ");i.forEach((a,r)=>{const o=document.createElement("span");o.className="word",[...a].forEach(l=>{const c=document.createElement("span");c.innerText=l,c.className="char",c.style.animationDelay=`${t*.05}s`,o.appendChild(c),t++}),n.appendChild(o),r<i.length-1&&(n.appendChild(document.createTextNode(" ")),t++)})}document.addEventListener("mousemove",s=>{const t=(window.innerWidth/2-s.pageX)/50,i=(window.innerHeight/2-s.pageY)/50,a=document.querySelector(".bg-gradient");a&&(a.style.transform=`translate(${t}px, ${i}px)`)})}function b(){const e=document.getElementById("matrix-canvas");if(!e)return;const n=e.getContext("2d");let s=e.width=window.innerWidth,t=e.height=window.innerHeight;const i="010101011101010101010101010",a=14,r=s/a,o=Array(Math.floor(r)).fill(1);function l(){n.fillStyle="rgba(3, 3, 3, 0.1)",n.fillRect(0,0,s,t),n.font=a+"px monospace";for(let c=0;c<o.length;c++){const d=i.charAt(Math.floor(Math.random()*i.length)),m=Math.random()*.4;n.fillStyle=`rgba(99, 102, 241, ${m})`,n.fillText(d,c*a,o[c]*a),o[c]*a>t&&Math.random()>.975&&(o[c]=0),o[c]++}}setInterval(l,33),window.addEventListener("resize",()=>{s=e.width=window.innerWidth,t=e.height=window.innerHeight;const c=Math.floor(s/a);o.length=0;for(let d=0;d<c;d++)o[d]=1})}document.querySelector("#app").innerHTML=`
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
`;u();function $(){const e=document.getElementById("theme-toggle");(localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"))==="light"&&document.documentElement.setAttribute("data-theme","light"),e.addEventListener("click",()=>{document.documentElement.getAttribute("data-theme")==="light"?(document.documentElement.removeAttribute("data-theme"),localStorage.setItem("theme","dark")):(document.documentElement.setAttribute("data-theme","light"),localStorage.setItem("theme","light"))})}$();function T(){const e=document.querySelector(".scroll-indicator");let n;const s=5e3;function t(){e.classList.add("visible")}function i(){e.classList.remove("visible")}function a(){i(),clearTimeout(n),n=setTimeout(t,s)}n=setTimeout(t,s),window.addEventListener("scroll",a,{passive:!0})}T();
