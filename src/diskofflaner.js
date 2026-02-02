import './style.css'

function initAnimations() {
    const title = document.getElementById('page-title');
    if (title) {
        const text = title.innerText;
        title.innerHTML = '';
        let globalIdx = 0;
        const words = text.split(' ');

        words.forEach((word, wIdx) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';

            [...word].forEach((char) => {
                const span = document.createElement('span');
                span.innerText = char;
                span.className = 'char';
                span.style.animationDelay = `${globalIdx * 0.05}s`;
                wordSpan.appendChild(span);
                globalIdx++;
            });

            title.appendChild(wordSpan);
            if (wIdx < words.length - 1) {
                title.appendChild(document.createTextNode(' '));
                globalIdx++;
            }
        });
    }

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

function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    toggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Initialize everything on load
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMatrix();
    initAnimations();
});
