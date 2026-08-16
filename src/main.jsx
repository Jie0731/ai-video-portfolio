import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowUpRight, BarChart3, ExternalLink, Film, Moon,
  Play, Sparkles, Sun, Volume2, WandSparkles, Scissors, MapPin
} from 'lucide-react';
import './styles.css';

const DRIVE_FOLDER = 'https://drive.google.com/drive/folders/15l2gHrabvn6R4Ae69L9eT3geuFIwk468?usp=drive_link';

const videos = [
  { category: 'VSL', title: 'VSL Sample 01', id: '1GLqA1hRecs-XjqSyxb2kSng664PDYG6Q' },
  { category: 'VSL', title: 'VSL Sample 02', id: '1nspsNMSOdr7MF5ohEqLGW9YqASrPePv6' },
  { category: 'UGC', title: 'UGC Sample 01', id: '1zt04Dx3ZGsJMkVro352P7ZnWBFHUZd5n' },
  { category: 'UGC', title: 'UGC Sample 02', id: '1UrQSGRUrNPayrsrep45BrpKpyeBn9-e5' },
  { category: 'Pixar Style', title: 'Pixar Style Sample 01', id: '1xKC2xl10wkNBldjHnKppH2c9mg1eqpZi' },
  { category: 'Pixar Style', title: 'Pixar Style Sample 02', id: '1xnZo3fHo8OzVy3KpOd1x-Gz8vqJUglMC' },
  { category: 'Animation', title: 'Animation Sample 01', id: '1QuCpoSCUfo7UgP6dZpkC05I12bk9To8Z' },
  { category: 'Animation', title: 'Animation Sample 02', id: '1v881VFd8PExeN-yUC_wdcpUvThm6z266' },
  { category: 'Other AI Content', title: 'AI Content Sample 01', id: '1IINS2LLsrddG8Z2ypjKtDFUd5JP0a4hS' },
  { category: 'Other AI Content', title: 'AI Content Sample 02', id: '16mrRYBeGBTZqK2EZQvgZOAcwNvdJLAra' },
  { category: 'Other AI Content', title: 'AI Content Sample 03', id: '1K1DFWAnZ6ifZrtXiYv95tRFzKMjXIZrl' },
  { category: 'Other AI Content', title: 'AI Content Sample 04', id: '1H8zPxAMiXuP7tY8Gu1qPlxqbZTfUiZGf' },
  { category: 'Other AI Content', title: 'AI Content Sample 05', id: '1lehYeYhwOZjUdCGYoN72kRvkr5HGBq7v' }
];

const categories = ['All', 'VSL', 'UGC', 'Pixar Style', 'Animation', 'Other AI Content'];
const tools = [
  ['Google Flow / Veo', Film], ['ChatGPT Image', Sparkles],
  ['Nano Banana / Gemini', WandSparkles], ['CapCut', Scissors], ['ElevenLabs', Volume2]
];
const previewUrl = id => `https://drive.google.com/file/d/${id}/preview?autoplay=1&mute=1`;
const viewUrl = id => `https://drive.google.com/file/d/${id}/view`;

function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]')];
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const duration = 1200;
      const tick = now => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(value * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: .5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref}>{display.toFixed(decimals)}{suffix}</span>;
}

function VideoCard({ video, index }) {
  const cardRef = useRef(null);
  const onMove = e => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = cardRef.current;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    el.style.setProperty('--rx', `${(-y * 2.2).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 2.2).toFixed(2)}deg`);
  };
  const reset = () => {
    const el = cardRef.current;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };
  return (
    <article
      className="video-card reveal-card"
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ '--delay': `${Math.min(index * 45, 260)}ms` }}
      data-reveal
    >
      <div className="video-frame">
        <iframe
          src={previewUrl(video.id)}
          title={video.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
        <div className="inline-note"><span className="live-dot"/> INLINE PLAYER</div>
      </div>
      <div className="video-meta">
        <div><span>{video.category}</span><h3>{video.title}</h3></div>
        <a href={viewUrl(video.id)} target="_blank" rel="noreferrer" aria-label={`Open ${video.title} in Google Drive`}><ExternalLink size={17}/></a>
      </div>
    </article>
  );
}

function App() {
  const [active, setActive] = useState('All');
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const filtered = useMemo(() => active === 'All' ? videos : videos.filter(v => v.category === active), [active]);
  useReveal();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#080808' : '#f3f4ef');
  }, [theme]);

  useEffect(() => {
    const onMove = e => {
      document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
      document.documentElement.style.setProperty('--my', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <main id="top">
      <div className="cursor-glow" aria-hidden="true" />
      <header className="nav-wrap">
        <nav className="nav shell">
          <a className="brand" href="#top">JJA<span>.</span></a>
          <div className="navlinks">
            <a href="#results">Results</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">
              {theme === 'dark' ? <Sun size={17}/> : <Moon size={17}/>}<span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
            <a className="nav-cta" href={DRIVE_FOLDER} target="_blank" rel="noreferrer">Drive <ArrowUpRight size={14}/></a>
          </div>
        </nav>
      </header>

      <section className="hero shell">
        <div className="hero-grid">
          <div>
            <div className="eyebrow hero-in"><span className="dot"/> AVAILABLE FOR AI VIDEO WORK</div>
            <h1 className="hero-in d1">AI video that looks<br/><span>made to be watched.</span></h1>
            <p className="hero-copy hero-in d2">I’m John Jerald Abasola, an AI Video Creator & Video Editor focused on high-retention vertical content, realistic AI visuals, VSLs, UGC, animation, and fast production workflows.</p>
            <div className="hero-actions hero-in d3">
              <a href="#work" className="btn primary"><Play size={16} fill="currentColor"/> Watch my work</a>
              <a href="#results" className="btn ghost">See results <ArrowDown size={16}/></a>
            </div>
          </div>
          <div className="hero-orbit hero-in d2" aria-hidden="true">
            <div className="orbit-ring ring-a"/><div className="orbit-ring ring-b"/>
            <div className="orbit-core"><Play size={28} fill="currentColor"/></div>
            <span className="orbit-tag tag-a">VSL</span><span className="orbit-tag tag-b">UGC</span><span className="orbit-tag tag-c">AI</span>
          </div>
        </div>
        <div className="stats hero-in d4">
          <div><strong><Counter value={160} suffix="M+"/></strong><span>Organic views across Facebook & YouTube</span></div>
          <div><strong><Counter value={484.5} suffix="K" decimals={1}/></strong><span>YouTube watch hours</span></div>
          <div><strong><Counter value={119.1} suffix="K+" decimals={1}/></strong><span>YouTube subscribers gained</span></div>
        </div>
      </section>

      <div className="tool-marquee" aria-label="Tools I use">
        <div className="marquee-track">
          {[...tools, ...tools].map(([name, Icon], i) => <span key={`${name}-${i}`}><Icon size={15}/>{name}<b>✦</b></span>)}
        </div>
      </div>

      <section id="results" className="results shell">
        <div className="section-head" data-reveal>
          <div><span className="kicker">PROVEN RESULTS</span><h2>Content that performs.</h2></div>
          <p>Performance screenshots from my own content. The numbers below are backed by the analytics images shown here.</p>
        </div>
        <div className="results-summary">
          <div className="result-number" data-reveal><span>Facebook</span><strong><Counter value={104.5} suffix="M" decimals={1}/></strong><small>views</small></div>
          <div className="result-number" data-reveal><span>YouTube</span><strong><Counter value={59} suffix="M+"/></strong><small>views</small></div>
          <div className="result-number" data-reveal><span>YouTube</span><strong><Counter value={484.5} suffix="K" decimals={1}/></strong><small>watch hours</small></div>
          <div className="result-number" data-reveal><span>YouTube</span><strong><Counter value={119.1} suffix="K+" decimals={1}/></strong><small>subscribers</small></div>
        </div>
        <div className="analytics-grid">
          <a className="analytics-card" href="/assets/facebook-analytics.png" target="_blank" rel="noreferrer" data-reveal>
            <img src="/assets/facebook-analytics.png" alt="Facebook analytics showing more than 104 million views" />
            <div><BarChart3 size={17}/><span>Facebook Analytics</span><em>Open full image ↗</em></div>
          </a>
          <a className="analytics-card" href="/assets/youtube-analytics.png" target="_blank" rel="noreferrer" data-reveal>
            <img src="/assets/youtube-analytics.png" alt="YouTube analytics showing more than 59 million views" />
            <div><BarChart3 size={17}/><span>YouTube Analytics</span><em>Open full image ↗</em></div>
          </a>
        </div>
      </section>

      <section id="work" className="work shell">
        <div className="section-head" data-reveal>
          <div><span className="kicker">SELECTED WORK</span><h2>Play it right here.</h2></div>
          <p>Every card is a real Google Drive video player. Click the player controls directly — no separate preview window needed.</p>
        </div>
        <div className="filters" role="tablist" aria-label="Portfolio categories" data-reveal>
          {categories.map(c => <button key={c} className={active === c ? 'active' : ''} onClick={() => setActive(c)}>{c}</button>)}
        </div>
        <div className="video-grid" key={active}>
          {filtered.map((video, i) => <VideoCard key={video.id} video={video} index={i}/>) }
        </div>
      </section>

      <section className="workflow shell">
        <div className="section-head compact" data-reveal><div><span className="kicker">TOOLKIT</span><h2>AI-native workflow.</h2></div></div>
        <div className="tool-grid">
          {tools.map(([name, Icon], i) => <div className="tool" key={name} data-reveal style={{'--delay':`${i*55}ms`}}><Icon size={21}/><span>{name}</span><ArrowUpRight size={14}/></div>)}
        </div>
      </section>

      <section id="about" className="about shell">
        <div className="about-panel" data-reveal>
          <span className="kicker">ABOUT</span>
          <h2>Fast production.<br/>Strong visual judgment.<br/>Consistent output.</h2>
          <div className="about-copy">
            <p>I’m a BSIT graduate and faceless content creator from Quezon City, Philippines. I create short-form AI content for social platforms and understand the full workflow from script to final export.</p>
            <p>My focus is making AI-generated content feel intentional rather than obviously AI — with better shot selection, continuity, pacing, sound, and visual consistency.</p>
          </div>
        </div>
      </section>

      <section className="contact shell" id="contact">
        <div className="contact-box" data-reveal>
          <span className="kicker">LET'S WORK</span>
          <h2>Need consistent AI videos<br/>without the production bottleneck?</h2>
          <p>Open to AI Video Creator, AI Video Editor, short-form creative, and ongoing content-production roles.</p>
          <div className="contact-actions">
            <a className="btn primary" href="#work"><Play size={16} fill="currentColor"/> Watch portfolio</a>
            <a className="btn ghost" href={DRIVE_FOLDER} target="_blank" rel="noreferrer">Open Drive <ArrowUpRight size={16}/></a>
          </div>
          <div className="location"><MapPin size={14}/> Quezon City, Philippines</div>
        </div>
      </section>

      <footer className="shell"><span>© 2026 John Jerald Abasola</span><span>AI Video Creator & Video Editor</span></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
