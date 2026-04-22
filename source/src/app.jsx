const { useEffect, useRef } = React;

const content = {
  en: {
    nav: {
      about: 'About',
      agentLab: 'Agent Lab',
      ventures: 'Ventures',
      journal: 'Journal',
      contact: 'Contact'
    },
    hero: {
      meta: ['Systems Architect', 'Founder of auctura ai', 'Based Globally'],
      nameA: 'Yali',
      nameB: 'Li',
      title: ['Production Ready', 'Agent Architectures'],
      pitch: 'I architect autonomous systems that solve production operational bottlenecks. I only deploy patterns that have survived the pressure of my own ventures.',
      scroll: 'Scroll'
    },
    about: {
      label: '01 Philosophy',
      headline: 'I build systems that survive contact with reality. Then I help you do the same.',
      body: [
        "I am an independent architect operating at the intersection of AI, commerce, and software. My methodology is forged in the trenches of running my own ventures with real capital and hard deadlines.",
        "Production is my primary focus. When I discuss AI deployment, I am not discussing theoretical demos. I am solving for the edge-case errors that appear only when a real customer is waiting. I build for the 1% of failure that usually breaks the other 99%.",
        "I currently maintain a multi-member LLC as a live laboratory for Agent to Agent (A2A) architecture. Six worker agents manage my operational stack under a central orchestrator. The patterns that succeed there define the architectural blueprints I deliver for auctura ai."
      ]
    },
    agentLab: {
      label: '02 Agent Lab',
      headline: 'Field testing autonomous coordination before it reaches the client.',
      intro: [
        "I transitioned the operations of my own business, real inventory, revenue, and stakes, to a fleet of autonomous agents. They negotiate, delegate, and self-correct, only escalating to me when a scenario falls outside their operational mandate.",
        "Their outputs integrate with my internal knowledge base, creating a feedback loop where raw agent data meets human context. Isolated agents create noise; agents integrated with a living knowledge base create leverage.",
        "This is an operational reality. Every system I design for auctura ai is backed by an architecture currently running on my own books."
      ],
      diagramCaption: 'Six worker agents coordinated by an orchestrator. Each runs autonomously on scheduled triggers; the orchestrator aggregates their outputs into a single daily briefing and routes exceptions back to me.',
      orchestratorName: 'daily-hub',
      orchestratorRole: 'Orchestrator',
      agents: [
        { name: 'account-guardian', role: 'Account health, policy violations, hijacker detection' },
        { name: 'competitor-intel', role: 'Competitor pricing, reviews, BSR shifts, new entrants' },
        { name: 'ppc-manager', role: 'Ad performance, wasted spend, keyword optimization' },
        { name: 'product-scout', role: 'Breakout product scouting, cost profit analysis' },
        { name: 'customer-voice', role: 'Review analysis, Q&A monitoring, improvement insights' },
        { name: 'listing-audit', role: 'Listing quality, Buy Box, keyword rankings, suppressions' }
      ],
      closing: "The system runs tonight, whether I log in or not. If you want this level of operational autonomy designed for your business, let's talk at auctura ai →"
    },
    ventures: {
      label: '03 Ventures',
      intro: 'Active projects. Consulting is the primary focus; the others serve as the proving ground for new architectural patterns.',
      items: [
        {
          num: '01',
          name: 'auctura ai',
          tagline: 'Systems Consulting, A2A for SMB',
          desc: 'Designing and building agent systems for small to mid businesses that want AI in their workflows but can\'t justify enterprise consulting rates. The architecture you see in Agent Lab is what I sell.',
          stack: ['A2A', 'MCP', 'LangGraph', 'Ops design'],
          status: 'Live',
          statusClass: 'status-live',
          href: 'https://aucturaai.com',
          hrefLabel: 'aucturaai.com'
        },
        {
          num: '02',
          name: 'Shreck Mode (MGC)',
          tagline: 'Quantitative Strategy, Pine Script',
          desc: 'A scalping strategy for Micro Gold Futures utilizing HTF alignment and a confluence scoring engine. Currently in live paper trading iteration. A discipline in logic and risk.',
          stack: ['Pine Script', 'TradingView', 'Quant'],
          status: 'Iterating',
          statusClass: 'status-iterating'
        }
      ]
    },
    journal: {
      label: '04 Journal',
      emptyTitle: 'The journal starts soon.',
      emptySub: 'Notes from the trench, what worked, what failed, what I got wrong.'
    },
    contact: {
      label: '05 Contact',
      headline: "For high-stakes problems or architectural collaborations, let's connect.",
      ctaText: 'Looking for AI consulting? My practice lives at',
      ctaLink: 'aucturaai.com',
      ctaHref: 'https://aucturaai.com',
      methods: [
        { label: 'Email', value: 'hi@aucturaai.com', href: 'mailto:hi@aucturaai.com' },
        { label: 'LinkedIn', value: 'linkedin.com/in/aucturaai', href: 'https://www.linkedin.com/in/aucturaai' },
        { label: 'Location', value: 'On Earth' }
      ]
    },
    footer: {
      left: '© 2026 Yali Li, Founder of auctura ai'
    }
  }
};

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '' }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function ThemeToggle() {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const isDark = theme === 'dark';
    const iconColor = isDark ? '%23fafafa' : '%23000000';
    const iconBg = isDark ? '%23050505' : '%23fcfcfc';
    const svg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='${iconBg}'/%3E%3Ctext x='50%25' y='58%25' text-anchor='middle' dominant-baseline='middle' font-family='Georgia,serif' font-style='italic' font-weight='400' font-size='18' fill='${iconColor}'%3EYL%3C/text%3E%3C/svg%3E`;
    const appleSvg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Crect width='180' height='180' fill='${iconBg}'/%3E%3Ctext x='50%25' y='58%25' text-anchor='middle' dominant-baseline='middle' font-family='Georgia,serif' font-style='italic' font-weight='400' font-size='100' fill='${iconColor}'%3EYL%3C/text%3E%3C/svg%3E`;
    
    document.querySelector('link[rel="icon"]')?.setAttribute('href', svg);
    document.querySelector('link[rel="apple-touch-icon"]')?.setAttribute('href', appleSvg);
    document.getElementById('meta-theme-color')?.setAttribute('content', isDark ? '#050505' : '#fcfcfc');
  }, [theme]);

  return (
    <button 
      className="theme-toggle" 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-dim)', marginLeft: '12px' }}
    >
      {theme === 'light' ? '☾' : '☀'}
    </button>
  );
}

function App() {
  const t = content.en;

  return (
    <>
      <nav>
        <div className="nav-mark">
          Yali Li<span>/ Systems Architect</span>
        </div>
        <div className="nav-links">
          <a href="#about">{t.nav.about}</a>
          <a href="#agent-lab">{t.nav.agentLab}</a>
          <a href="#ventures">{t.nav.ventures}</a>
          <a href="#journal">{t.nav.journal}</a>
          <a href="#contact">{t.nav.contact}</a>
          <ThemeToggle />
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section id="hero">
          <div>
            <div className="hero-top">
              <div className="hero-meta">
                {t.hero.meta.map((m, i) => (
                  <div key={i} className="hero-meta-row">{m}</div>
                ))}
              </div>
              <div>
                <h1 className="hero-name">
                  {t.hero.nameA} <em>{t.hero.nameB}</em>
                </h1>
                <div className="hero-title">
                  {t.hero.title[0]}<span className="sep"> </span>{t.hero.title[1]}
                </div>
                <p className="hero-pitch">{t.hero.pitch}</p>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <div className="hero-scroll">{t.hero.scroll}</div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <Reveal>
            <div className="section-label">{t.about.label}</div>
            <div className="about-grid">
              <h2 className="about-headline">{t.about.headline}</h2>
              <div className="about-body">
                {t.about.body.map((p, i) => (
                  <p key={i} className={i > 0 ? 'dim' : ''}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* AGENT LAB */}
        <section id="agent-lab">
          <Reveal>
            <div className="section-label">{t.agentLab.label}</div>
            <h2 className="agentlab-headline">{t.agentLab.headline}</h2>
            <div className="agentlab-intro">
              {t.agentLab.intro.map((p, i) => (
                <p key={i} className={i > 0 ? 'dim' : ''}>{p}</p>
              ))}
            </div>

            <div className="agent-diagram">
              <svg viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" aria-label="Agent architecture diagram">
                {/* Orchestrator center point: (500, 70). Worker centers at y=310, x at 90, 230, 370, 510, 650, 790, 930 */}

                {/* Connection lines from orchestrator bottom center to each worker box center-top */}
                <g stroke="var(--ink-faint)" strokeWidth="1" fill="none" opacity="0.4">
                  <line x1="500" y1="110" x2="90" y2="290" />
                  <line x1="500" y1="110" x2="230" y2="290" />
                  <line x1="500" y1="110" x2="370" y2="290" />
                  <line x1="500" y1="110" x2="510" y2="290" />
                  <line x1="500" y1="110" x2="650" y2="290" />
                  <line x1="500" y1="110" x2="790" y2="290" />
                </g>

                {/* Pulse dots traveling from orchestrator to each worker — staggered */}
                {[
                  { x2: 90,  delay: '0s' },
                  { x2: 230, delay: '0.6s' },
                  { x2: 370, delay: '1.2s' },
                  { x2: 510, delay: '1.8s' },
                  { x2: 650, delay: '2.4s' },
                  { x2: 790, delay: '3.0s' }
                ].map((p, i) => (
                  <circle key={i} r="2.5" fill="var(--accent)" opacity="0">
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.1;0.9;1"
                      dur="3.6s"
                      begin={p.delay}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cx"
                      values={`500;${p.x2}`}
                      dur="3.6s"
                      begin={p.delay}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values="110;290"
                      dur="3.6s"
                      begin={p.delay}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}

                {/* Orchestrator (top center) with breathing pulse */}
                <g transform="translate(400, 40)">
                  <rect width="200" height="70" rx="2" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5">
                    <animate
                      attributeName="stroke-opacity"
                      values="0.6;1;0.6"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <text x="100" y="30" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="10" letterSpacing="1.4" fill="var(--accent)" style={{textTransform: 'uppercase'}}>{t.agentLab.orchestratorRole}</text>
                  <text x="100" y="52" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="14" fontWeight="500" fill="var(--ink)">{t.agentLab.orchestratorName}</text>
                </g>

                {/* 6 worker agents — positioned so their center-top sits at y=290 and center-x matches connection endpoints */}
                {t.agentLab.agents.map((a, i) => {
                  // center x: 90, 230, 370, 510, 650, 790. Box width 130, so x = center - 65
                  const centerXs = [90, 230, 370, 510, 650, 790];
                  const x = centerXs[i] - 65;
                  // stagger each agent's breathing animation
                  const delay = `${i * 0.5}s`;
                  return (
                    <g key={i} transform={`translate(${x}, 290)`}>
                      <rect width="130" height="60" rx="2" fill="var(--bg)" stroke="var(--rule)" strokeWidth="1">
                        <animate
                          attributeName="stroke"
                          values="var(--svg-stroke-1);var(--svg-stroke-2);var(--svg-stroke-1)"
                          dur="4s"
                          begin={delay}
                          repeatCount="indefinite"
                        />
                      </rect>
                      <text x="65" y="25" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="500" fill="var(--ink)">{a.name}</text>
                      <text x="65" y="44" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8" letterSpacing="0.8" fill="var(--ink-dim)">WORKER</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <p className="agentlab-caption">{t.agentLab.diagramCaption}</p>

            <div className="agent-list">
              {t.agentLab.agents.map((a, i) => (
                <div key={i} className="agent-row">
                  <div className="agent-name">{a.name}</div>
                  <div className="agent-role">{a.role}</div>
                </div>
              ))}
            </div>

            <p className="agentlab-closing">
              {t.agentLab.closing.split('auctura ai').length > 1 ? (
                <>
                  {t.agentLab.closing.split('auctura ai')[0]}
                  <a href="https://aucturaai.com" target="_blank" rel="noopener noreferrer" className="inline-link">auctura ai</a>
                  {t.agentLab.closing.split('auctura ai')[1]}
                </>
              ) : t.agentLab.closing}
            </p>
          </Reveal>
        </section>

        {/* VENTURES */}
        <section id="ventures">
          <Reveal>
            <div className="section-label">{t.ventures.label}</div>
            <p className="ventures-intro">{t.ventures.intro}</p>
            <div className="projects-list">
              {t.ventures.items.map((p, i) => (
                <div key={i} className="project">
                  <div className="project-number">{p.num}</div>
                  <div>
                    <h3 className="project-name">
                      {p.href ? (
                        <a href={p.href} target="_blank" rel="noopener noreferrer" className="project-link">
                          {p.name} <span className="project-link-arrow">↗</span>
                        </a>
                      ) : p.name}
                    </h3>
                    <div className="project-tagline">{p.tagline}</div>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-stack">
                      {p.stack.map((s, j) => (
                        <span key={j} className="stack-pill">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-status">
                    <div className={`status-badge ${p.statusClass}`}>
                      {p.status}
                    </div>
                    {p.hrefLabel && (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="project-visit">
                        Visit →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* JOURNAL */}
        <section id="journal">
          <Reveal>
            <div className="section-label">{t.journal.label}</div>
            <div className="journal-empty">
              <div className="journal-empty-title">{t.journal.emptyTitle}</div>
              <div className="journal-empty-sub">{t.journal.emptySub}</div>
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <Reveal>
            <div className="section-label">{t.contact.label}</div>
            <h2 className="contact-headline">{t.contact.headline}</h2>

            <div className="contact-cta">
              <span className="contact-cta-text">{t.contact.ctaText}</span>
              {' '}
              <a href={t.contact.ctaHref} target="_blank" rel="noopener noreferrer" className="contact-cta-link">
                {t.contact.ctaLink} <span className="project-link-arrow">↗</span>
              </a>
            </div>

            <div className="contact-methods">
              {t.contact.methods.map((m, i) => (
                <div key={i} className="contact-method">
                  <div className="contact-label">{m.label}</div>
                  {m.href ? (
                    <a
                      href={m.href}
                      className="contact-value contact-link"
                      target={m.href.startsWith('http') ? '_blank' : undefined}
                      rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {m.value}
                    </a>
                  ) : (
                    <div className="contact-value">{m.value}</div>
                  )}
                </div>
              ))}
            </div>
            <footer>
              <div>{t.footer.left}</div>
            </footer>
          </Reveal>
        </section>
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
