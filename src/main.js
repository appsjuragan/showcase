import './style.css'

const USERNAME = 'appsjuragan';

async function fetchData() {
  try {
    const [reposResponse, eventsResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=100`),
      fetch(`https://api.github.com/users/${USERNAME}/events?per_page=20`)
    ]);

    const repos = await reposResponse.json();
    const events = await eventsResponse.json();

    renderRepos(repos);
    renderActivity(events);
    initAnimations();
    initMatrix();
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    document.querySelector('#repo-grid').innerHTML = '<p class="error">Failed to load repositories. Please check your connection.</p>';
  }
}

function renderRepos(repos) {
  const grid = document.querySelector('#repo-grid');
  grid.innerHTML = '';

  // Sort by stars descending
  const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 12);

  sortedRepos.forEach((repo, index) => {
    const card = document.createElement('div');
    card.className = 'repo-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.animation = `fadeInUp 0.6s ${0.1 * index + 0.4}s forwards`;

    const lang = repo.language || 'Plain Text';

    card.innerHTML = `
      <h3 class="repo-name">${repo.name}</h3>
      <div class="tags">
        ${repo.topics ? repo.topics.map(topic => `<span class="tag">${topic}</span>`).join('') : ''}
        <span class="tag">${repo.license ? repo.license.spdx_id : 'MIT'}</span>
      </div>
      <p class="repo-description">${repo.description || 'No description provided.'}</p>
      <div class="repo-meta">
        <div class="repo-lang">
          <span class="lang-dot" style="background-color: ${getLangColor(lang)}"></span>
          ${lang}
        </div>
        <div class="repo-stats">
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
        </div>
      </div>
    `;

    card.onclick = () => window.open(repo.html_url, '_blank');
    grid.appendChild(card);
  });
}

function renderActivity(events) {
  const activityList = document.querySelector('#activity-list');
  activityList.innerHTML = '';

  events.forEach((event, index) => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.style.opacity = '0';
    item.style.animation = `fadeInRight 0.5s ${0.05 * index + 0.2}s forwards`;

    const type = formatEventType(event.type);
    const repoName = event.repo.name.replace(`${USERNAME}/`, '');
    const time = new Date(event.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const message = getEventMessage(event);

    item.innerHTML = `
      <div class="activity-icon">${getEventIcon(event.type)}</div>
      <div class="activity-content">
        <div class="activity-header">
          <span class="activity-type">${type}</span>
          <span class="activity-time">${time}</span>
        </div>
        <span class="activity-repo">${repoName}</span>
        ${message ? `<p class="activity-message">${message}</p>` : ''}
      </div>
    `;

    item.onclick = () => window.open(`https://github.com/${event.repo.name}`, '_blank');
    activityList.appendChild(item);
  });
}

function getEventMessage(event) {
  if (event.type === 'PushEvent' && event.payload.commits && event.payload.commits.length > 0) {
    return event.payload.commits[0].message.split('\n')[0];
  }
  if (event.type === 'PullRequestEvent') {
    return event.payload.pull_request.title;
  }
  if (event.type === 'IssuesEvent') {
    return event.payload.issue.title;
  }
  if (event.type === 'CreateEvent') {
    return `Created ${event.payload.ref_type} ${event.payload.ref || ''}`.trim();
  }
  if (event.type === 'ReleaseEvent') {
    return event.payload.release.name || event.payload.release.tag_name;
  }
  return null;
}

function formatEventType(type) {
  return type.replace('Event', '').replace(/([A-Z])/g, ' $1').trim();
}

function getEventIcon(type) {
  const icons = {
    PushEvent: '🚀',
    CreateEvent: '✨',
    WatchEvent: '⭐',
    ForkEvent: '🍴',
    IssuesEvent: '🔧',
    PullRequestEvent: '🔀',
    DeleteEvent: '🗑️'
  };
  return icons[type] || '📝';
}

function getLangColor(lang) {
  const colors = {
    'Rust': '#dea584',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'C++': '#f34b7d',
    'Python': '#3572A5',
    'Go': '#00ADD8'
  };
  return colors[lang] || '#8b8b8b';
}

function initAnimations() {
  // Cursor Follower
  const cursor = document.querySelector('.cursor-follower');
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Title Animation
  const title = document.getElementById('hero-title');
  if (title) {
    const text = title.innerText;
    title.innerHTML = '';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.className = 'char';
      span.style.animationDelay = `${i * 0.05}s`;
      title.appendChild(span);
    });
  }

  // Parallax Effect
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;
    const bg = document.querySelector('.bg-gradient');
    if (bg) bg.style.transform = `translate(${x}px, ${y}px)`;
  });
}

function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const characters = "010101011101010101010101010";
  const fontSize = 14;
  const columns = width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(3, 3, 3, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));

      // Use the theme's accent color (indigo-500) with varying opacities
      const opacity = Math.random() * 0.4;
      ctx.fillStyle = `rgba(99, 102, 241, ${opacity})`;

      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 33);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const newColumns = Math.floor(width / fontSize);
    drops.length = 0;
    for (let i = 0; i < newColumns; i++) drops[i] = 1;
  });
}

document.querySelector('#app').innerHTML = `
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
`;

fetchData();
