import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Play, Sparkles, Film, WandSparkles, Scissors, Volume2, Mail, MapPin, X, BarChart3 } from 'lucide-react';
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
  { category: 'Other AI Content', title: 'AI Content Sample 05', id: '1lehYeYhwOZjUdCGYoN72kRvkr5HGBq7v' },
];

const tools = [
  ['Google Flow / Veo', Film],
  ['ChatGPT Image', Sparkles],
  ['Nano Banana / Gemini', WandSparkles],
  ['CapCut', Scissors],
  ['ElevenLabs', Volume2],
];

const categories = ['All', 'VSL', 'UGC', 'Pixar Style', 'Animation', 'Other AI Content'];
const previewUrl = id => `https://drive.google.com/file/d/${id}/preview`;
const viewUrl = id => `https://drive.google.com/file/d/${id}/view`;

function App() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => active === 'All' ? videos : videos.filter(v => v.category === active), [active]);

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top">JJA<span>.</span></a>
        <div className="navlinks">
          <a href="#results">Results</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a className="nav-cta" href={DRIVE_FOLDER} target="_blank" rel="noreferrer">Drive <ArrowUpRight size={15}/></a>
        </div>
      </nav>

      <section id="top" className="hero shell">
        <div className="eyebrow"><span className="dot"/> AVAILABLE FOR AI VIDEO WORK</div>
        <h1>AI video that looks<br/><span>made to be watched.</span></h1>
        <p className="hero-copy">I’m John Jerald Abasola, an AI Video Creator & Video Editor specializing in high-retention vertical content, realistic AI visuals, and fast production workflows.</p>
        <div className="hero-actions">
          <a href="#work" className="btn primary"><Play size={17} fill="currentColor"/> Watch my work</a>
          <a href="#contact" className="btn ghost">Work with me <ArrowUpRight size={17}/></a>
        </div>
        <div className="stats">
          <div><strong>160M+</strong><span>Organic views across Facebook & YouTube</span></div>
          <div><strong>484.5K</strong><span>YouTube watch hours</span></div>
          <div><strong>119K+</strong><span>YouTube subscribers gained</span></div>
        </div>
      </section>

      <section id="results" className="results shell">
        <div className="section-head">
          <div><span className="kicker">PROVEN RESULTS</span><h2>Content that performs.</h2></div>
          <p>Performance screenshots from my own content. Over 160 million organic views across Facebook and YouTube.</p>
        </div>
        <div className="results-summary">
          <div className="result-number"><span>Facebook</span><strong>104.5M</strong><small>views</small></div>
          <div className="result-number"><span>YouTube</span><strong>59M+</strong><small>views</small></div>
          <div className="result-number"><span>YouTube</span><strong>484.5K</strong><small>watch hours</small></div>
          <div className="result-number"><span>YouTube</span><strong>+119.1K</strong><small>subscribers</small></div>
        </div>
        <div className="analytics-grid">
          <button className="analytics-card" onClick={() => setSelected({ image: '/assets/facebook-analytics.png', title: 'Facebook Analytics' })}>
            <img src="/assets/facebook-analytics.png" alt="Facebook analytics showing over 104 million views" />
            <div><BarChart3 size={17}/><span>Facebook Analytics</span><em>Click to enlarge</em></div>
          </button>
          <button className="analytics-card" onClick={() => setSelected({ image: '/assets/youtube-analytics.png', title: 'YouTube Analytics' })}>
            <img src="/assets/youtube-analytics.png" alt="YouTube analytics showing over 59 million views" />
            <div><BarChart3 size={17}/><span>YouTube Analytics</span><em>Click to enlarge</em></div>
          </button>
        </div>
      </section>

      <section id="work" className="work shell">
        <div className="section-head">
          <div><span className="kicker">SELECTED WORK</span><h2>Watch the actual work.</h2></div>
          <p>Playable portfolio samples organized by format and visual style. Open any video for a larger preview.</p>
        </div>
        <div className="filters" role="tablist" aria-label="Portfolio categories">
          {categories.map(c => <button key={c} className={active === c ? 'active' : ''} onClick={() => setActive(c)}>{c}</button>)}
        </div>
        <div className="video-grid">
          {filtered.map((video) => (
            <article className="video-card" key={video.id}>
              <button className="video-frame" onClick={() => setSelected(video)} aria-label={`Play ${video.title}`}>
                <iframe src={previewUrl(video.id)} title={video.title} allow="autoplay; encrypted-media" loading="lazy" />
                <span className="frame-shield" />
                <span className="center-play"><Play size={22} fill="currentColor"/></span>
              </button>
              <div className="video-meta">
                <div><span>{video.category}</span><h3>{video.title}</h3></div>
                <a href={viewUrl(video.id)} target="_blank" rel="noreferrer" aria-label={`Open ${video.title} in Google Drive`}><ArrowUpRight size={18}/></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="workflow shell">
        <div className="section-head compact"><div><span className="kicker">TOOLKIT</span><h2>AI-native workflow.</h2></div></div>
        <div className="tool-grid">
          {tools.map(([name, Icon]) => <div className="tool" key={name}><Icon size={21}/><span>{name}</span></div>)}
        </div>
      </section>

      <section id="about" className="about shell">
        <div className="about-panel">
          <span className="kicker">ABOUT</span>
          <h2>Fast production.<br/>Strong visual judgment.<br/>Consistent output.</h2>
          <div className="about-copy">
            <p>I’m a BSIT graduate and faceless content creator from Quezon City, Philippines. I create short-form AI content for social platforms and understand the full workflow from script to final export.</p>
            <p>My focus is making AI-generated content feel intentional rather than obviously AI — with better shot selection, continuity, pacing, sound, and visual consistency.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact shell">
        <div className="contact-box">
          <span className="kicker">LET'S WORK</span>
          <h2>Need consistent AI videos<br/>without the production bottleneck?</h2>
          <p>Open to AI Video Creator, AI Video Editor, short-form creative, and ongoing content-production roles.</p>
          <div className="contact-actions">
            <a className="btn primary" href="#work"><Play size={17} fill="currentColor"/> Watch portfolio</a>
            <a className="btn ghost" href={DRIVE_FOLDER} target="_blank" rel="noreferrer">Drive folder <ArrowUpRight size={17}/></a>
          </div>
          <div className="location"><MapPin size={15}/> Quezon City, Philippines</div>
        </div>
      </section>

      <footer className="shell"><span>© 2026 John Jerald Abasola</span><span>AI Video Creator & Video Editor</span></footer>

      {selected && (
        <div className="modal" role="dialog" aria-modal="true" onClick={() => setSelected(null)}>
          <div className={selected.image ? 'modal-inner image-modal' : 'modal-inner'} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X size={22}/></button>
            {selected.image ? (
              <img src={selected.image} alt={selected.title} />
            ) : (
              <iframe src={previewUrl(selected.id)} title={selected.title} allow="autoplay; encrypted-media" allowFullScreen />
            )}
          </div>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
