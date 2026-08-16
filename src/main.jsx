import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Play, Sparkles, Film, WandSparkles, Scissors, Volume2, Mail, MapPin } from 'lucide-react';
import './styles.css';

const DRIVE_URL = 'https://drive.google.com/drive/folders/1FNSgg_IGgOAbBfw2luzpZym3Q-DINi6S?usp=sharing';

const samples = [
  { title: 'AI UGC & Product Creative', label: 'AI UGC', desc: 'Realistic AI talent, product integration, hooks, B-roll, and conversion-focused short-form creative.' },
  { title: 'AI Influencer Videos', label: 'AI Influencer', desc: 'Character-consistent scenes, cinematic generations, voiceover, editing, and social-first pacing.' },
  { title: 'Faceless Short-Form', label: 'Short Form', desc: 'High-retention vertical storytelling designed for Reels, Shorts, TikTok, and Facebook.' },
  { title: 'AI Food & Recipe Content', label: 'Visual Gen', desc: 'Consistent characters, ingredient continuity, commercial food visuals, and step-by-step video sequences.' },
  { title: 'VSL / Performance Creative', label: 'VSL', desc: 'Script-led visual storytelling with clear hooks, pattern interrupts, captions, and direct-response structure.' },
  { title: 'Creative Experiments', label: 'AI Video', desc: 'Style exploration, prompt engineering, image-to-video workflows, and rapid creative iteration.' },
];

const tools = [
  ['Google Flow / Veo', Film],
  ['ChatGPT Image', Sparkles],
  ['Nano Banana / Gemini', WandSparkles],
  ['CapCut', Scissors],
  ['ElevenLabs', Volume2],
];

function App() {
  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#top">JJA<span>.</span></a>
        <div className="navlinks">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a className="nav-cta" href={DRIVE_URL} target="_blank" rel="noreferrer">Portfolio <ArrowUpRight size={15}/></a>
        </div>
      </nav>

      <section id="top" className="hero shell">
        <div className="eyebrow"><span className="dot"/> AVAILABLE FOR AI VIDEO WORK</div>
        <h1>AI video that looks<br/><span>made to be watched.</span></h1>
        <p className="hero-copy">I’m John Jerald Abasola, an AI Video Creator & Video Editor specializing in high-retention vertical content, realistic AI visuals, and fast production workflows.</p>
        <div className="hero-actions">
          <a href={DRIVE_URL} target="_blank" rel="noreferrer" className="btn primary"><Play size={17} fill="currentColor"/> View my work</a>
          <a href="#contact" className="btn ghost">Work with me <ArrowUpRight size={17}/></a>
        </div>
        <div className="stats">
          <div><strong>100M+</strong><span>Combined content views</span></div>
          <div><strong>1 Year</strong><span>Video editing experience</span></div>
          <div><strong>Daily</strong><span>AI content production workflow</span></div>
        </div>
      </section>

      <section id="work" className="work shell">
        <div className="section-head">
          <div><span className="kicker">SELECTED WORK</span><h2>Built for the scroll.</h2></div>
          <p>AI-generated visuals, character consistency, editing, sound design, pacing, captions, and short-form storytelling — handled end to end.</p>
        </div>
        <div className="grid">
          {samples.map((s, i) => (
            <a href={DRIVE_URL} target="_blank" rel="noreferrer" className="card" key={s.title}>
              <div className="visual">
                <div className="noise"/>
                <div className="number">0{i+1}</div>
                <div className="play"><Play size={22} fill="currentColor"/></div>
              </div>
              <div className="card-body">
                <span>{s.label}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="view">View samples <ArrowUpRight size={15}/></div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="workflow shell">
        <div className="section-head compact">
          <div><span className="kicker">TOOLKIT</span><h2>AI-native workflow.</h2></div>
        </div>
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
            <a className="btn primary" href={DRIVE_URL} target="_blank" rel="noreferrer"><Play size={17} fill="currentColor"/> Portfolio folder</a>
            <a className="btn ghost" href="mailto:"><Mail size={17}/> Email me</a>
          </div>
          <div className="location"><MapPin size={15}/> Quezon City, Philippines</div>
        </div>
      </section>

      <footer className="shell"><span>© 2026 John Jerald Abasola</span><span>AI Video Creator & Video Editor</span></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
