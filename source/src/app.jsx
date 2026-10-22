const { useEffect, useRef, useState } = React;

/* ------------------------------------------------------------------ */
/*  Content                                                             */
/* ------------------------------------------------------------------ */

const site = {
  nav: [
    { href: '#projects', label: 'Projects' },
    { href: '#work', label: 'Work' },
    { href: '#how', label: 'How I work' },
    { href: '#contact', label: 'Contact' }
  ],
  hero: {
    name: 'Yali Li',
    role: 'Engineer, production AI systems',
    location: 'Issaquah, Washington',
    intro: 'I build systems that have to keep running after I close the laptop, a live futures execution service, a bus that lets two different models work one task, a nightly research agent that gets graded by a critic, and a booking tool for one-person studios. Before that, five years as a structural engineer.',
    links: [
      { label: 'Email', href: 'mailto:yalili8521@gmail.com' },
      { label: 'GitHub', href: 'https://github.com/yalili8521' }
    ]
  },
  story: {
    title: 'Projects',
    intro: 'Problems I had myself. Building and learning.',
    chapters: [
      {
        id: 'gcn',
        num: '00',
        when: '2020 to 2021',
        title: 'The first repository',
        summary: 'A fork of the reference graph convolutional network code, made during a timber engineering Ph.D. to learn how research software is built and run.',
        repo: 'gcn',
        href: 'https://github.com/yalili8521/gcn',
        problem: 'My Ph.D. was in timber engineering, and the questions kept outgrowing spreadsheets: how load moves through a wood connection, how to tell earlywood from latewood in a cross-section image without a person counting rings. I could run finite element software, but I had never read a real codebase.',
        built: 'The first thing in my GitHub account is this fork of the TensorFlow implementation of graph convolutional networks, pulled in to read it line by line and run it end to end. Alongside it, the first pipeline I wrote myself: OpenCV GrabCut to isolate the wood sample from its background, gray-level co-occurrence features to describe the texture, and K-Means to separate earlywood from latewood, in Python with scikit-learn and NumPy. The finite element side ran in ABAQUS, validated against lab displacement data.',
        broke: 'Nothing shipped and nothing broke; it was research code. What it did was change the default: from then on, when a question outgrew the tool, the answer was to write the tool.',
        stayed: 'Reading someone else\'s working code is the fastest way to learn what good looks like. Every project after this one started by reading before writing.',
        stack: ['Python', 'TensorFlow', 'OpenCV', 'scikit-learn', 'ABAQUS'],
        mech: null
      },
      {
        id: 'store',
        num: '01',
        when: '2025',
        title: 'A store that needed a second person',
        summary: 'A one-person Amazon store, seven scheduled agents doing the morning checks, retired when one of them lied.',
        problem: 'In January 2025 I opened an Amazon store for a smart ring and ran it alone: catalog, advertising, inventory, account health. Every one of those wants a daily check, and one person cannot look at six dashboards every morning without missing the one that matters.',
        built: 'I turned each morning check into a scheduled agent. Seven of them, each reading one surface of the store and writing a short report into my notes: account health, listing audit, competitor moves, ad performance, keyword harvest, customer voice, product scouting. By mid 2026 roughly thirty scheduled agents across three schedulers were feeding the same vault.',
        broke: 'One report misread a single-day dashboard tile and published wrong advertising numbers. The fleet was retired in July 2026 and replaced by interactive checks. The store itself did not clear its unit economics and is winding down.',
        stayed: 'Agents are only as honest as the thing they read. Every system after this one got an evaluation step before it got a feature.',
        stack: ['Claude Code', 'Scheduled tasks', 'Seller Central'],
        mech: 'fleet'
      },
      {
        id: 'quantitivestocks',
        when: 'Feb to Apr 2026',
        title: 'A model that predicts a number, not a direction',
        summary: 'An LSTM that outputs expected return, three paper accounts on Alpaca, a public dashboard, and backtests that said the edge was not there.',
        repo: 'quantitivestocks',
        href: 'https://github.com/yalili8521/quantitivestocks',
        demo: 'https://quantitative-stocks.vercel.app',
        demoLabel: 'Live dashboard',
        problem: 'I wanted to know whether machine learning could trade ETFs better than I could by hand. Every tutorial predicted up or down. Sizing a position needs a magnitude, not a coin flip, so the model had to output a number.',
        built: 'A two-layer LSTM with temporal attention that regresses the ten-day forward return, so confidence is the size of the predicted move and position size follows from it. Beside it an XGBoost swing model and a LightGBM intraday model; purged and embargoed validation splits so the feature window cannot leak into the test; a walk-forward backtester; VIX and 200-day regime gates, ATR trailing stops and half-Kelly sizing; three Alpaca paper accounts running intraday, swing and crypto; and a public dashboard on Vercel showing live positions and equity. 179 commits in nine weeks.',
        broke: 'The backtests. Across 59 ETFs from late January to early April, the daily models made a median total return of 0.09 percent with a median Sharpe of 0.3, and the intraday models lost in most symbols, median Sharpe minus 0.4 over 1,782 trades. Paper trading agreed: both ETF accounts sit about 8 percent below where they started. The system worked. The edge did not exist.',
        stayed: 'Two habits. Write the pass bar before the run, which became the pre-registered crypto research harness. And treat execution as its own problem, which became the live auto-trader. The dashboard is still up, losses included.',
        stack: ['PyTorch', 'XGBoost', 'LightGBM', 'Alpaca API', 'Vercel'],
        mech: 'regress'
      },
      {
        id: 'subtracker',
        when: 'Mar 2026',
        title: 'A tracker that reads my inbox',
        summary: 'Subscriptions found by reading billing emails, a serverless backend on Vercel, and a second model that caught what the first one was sending away.',
        repo: 'subscription-tracker',
        href: 'https://github.com/yalili8521/subscription-tracker',
        demo: 'https://subscription-tracker-iota-roan.vercel.app',
        demoLabel: 'Live app',
        problem: 'Recurring charges hide in receipts: streaming, cloud storage, API usage, insurance. I wanted one page that listed all of them with the next payment date, and I did not want to type them in.',
        built: 'A React and TypeScript front end with a monthly calendar of payment dates, a serverless API on Vercel functions backed by MongoDB, Google sign-in, and a Gmail import that pulls billing emails and asks a model whether each one is a subscription receipt, for which service, how much and how often. Sessions are signed with HMAC, Gmail tokens are encrypted at rest, every input is validated with a schema. Three days and 55 commits.',
        broke: 'Nothing in production. The review did. A security pass removed a hardcoded fallback secret, added timing-safe comparisons, rate limits on scans and a CSRF state on the OAuth flow. Then Codex read the import and pointed out that the full email body, with whatever it contained, was being sent to the model. The fix redacts the content before analysis.',
        stayed: 'A second model reads what the first one wrote. That review habit went into every project after this one. Deployed on Vercel.',
        stack: ['React', 'TypeScript', 'Vercel functions', 'MongoDB', 'Gmail API', 'OpenAI'],
        mech: 'inbox'
      },
      {
        id: 'pain-finder',
        num: '02',
        when: 'Jun 2026',
        title: 'A writer that gets graded every night',
        summary: 'A nightly research agent scored by a separate critic, allowed to propose rule changes but never to apply them.',
        repo: 'pain-finder-agent',
        href: 'https://github.com/yalili8521/pain-finder-agent',
        problem: 'I wanted to know what real people were frustrated about this month, not what vendor blogs said they were. The free sources (Reddit RSS, Hacker News, GitHub) return raw threads with no useful ranking at all.',
        built: 'A nightly prompt that uses the model as both planner and ranker, drafts a report with links and engagement counts, then spawns a separate critic agent that scores the draft on seven dimensions and demands fixes. The producer revises, up to two rounds, and writes the critique forward so the next night starts smarter. The critic can propose rule changes but can never apply them; a human approves.',
        broke: 'Three probes back to back got Reddit rate limited on night one. The prompt now sleeps sixty seconds between probes. One report came back full of abbreviations; a standing rule now bans them.',
        stayed: 'Seventeen logged runs, sixteen pending rule proposals, five honest nights where nothing cleared the bar and the report said so.',
        stack: ['Claude Code', 'Subagents', 'Rubric', 'Markdown as memory'],
        mech: 'critic'
      },
      {
        id: 'agent-bus',
        num: '03',
        when: 'Jun 2026',
        title: 'Two models, one task, one token',
        summary: 'Claude and Codex on one task over a SQLite bus: one execution token per turn, a human checked before every move.',
        repo: 'agent-bus',
        href: 'https://github.com/yalili8521/agent-bus',
        problem: 'A second model catches what the first one is blind to, but two agents talking freely either loop politely forever or both edit the same file. I needed a protocol, not a chat.',
        built: 'A SQLite message bus where the schema is the protocol: one agent holds the execution token per turn, handoffs are structured payloads rather than prose, a human message is checked before every turn, and only the reviewer can finalize done. The same idea shrank into a stdlib MCP server that puts Codex on tap inside any Claude Code session, which is the piece I use every day.',
        broke: 'A hung Codex child left no evidence of what it was doing for three calls in a row. The bridge now logs every call to stderr and tree-kills on timeout, because a plain kill orphans children on Windows.',
        stayed: 'Transport matters less than protocol. The reviewer being read-only is enforced by its permissions, not by trust.',
        stack: ['Python stdlib', 'SQLite', 'MCP', 'Claude + Codex'],
        mech: 'token'
      },
      {
        id: 'auto-trader',
        num: '04',
        when: 'Apr 2026 to now',
        title: 'Auto trading systems',
        summary: 'TradingView alerts turned into live futures orders, with a reconciler, two Windows services, and four outages that each left a test behind.',
        repo: 'auto-trader',
        href: 'https://github.com/yalili8521/auto-trader',
        problem: 'A trading strategy on a chart can raise an alert at three in the morning. Nobody is awake to turn that alert into an order, and if someone is, they hesitate.',
        built: 'A webhook service behind a Cloudflare tunnel that verifies a passphrase, tracks the position in a local ledger, sizes the order from live account equity, sends it to the broker over REST, and reconciles its own ledger against the broker every sixty seconds. It runs as two Windows services that restart on crash. Sixty five unit tests run without a broker account.',
        broke: 'Four times, each of them real money or nearly.',
        stayed: 'Live on a small account since April 2026, gold micro futures first, Nasdaq micro futures now. The strategies are not published; the plumbing is.',
        stack: ['FastAPI', 'Tradovate REST', 'NSSM services', 'Cloudflare Tunnel', 'unittest'],
        mech: 'pipeline',
        incidents: [
          { when: '2026-05-19', what: 'Reconciler read a stale broker snapshot one second after an entry, decided the position was a phantom, and wiped the ledger without closing the real position. It sat unmanaged for four and a half hours.', fix: 'Drift must persist across two consecutive cycles before anything is cleared. Four-scenario regression test.' },
          { when: '2026-05-21', what: 'The launcher was tied to my login session and died on sleep, logout and window close. Three outages in three days.', fix: 'Moved to Windows services in Session 0 with auto restart.' },
          { when: '2026-10-12', what: 'The broker booked a loss outside my process, so my daily loss breaker never saw it.', fix: 'The breaker now reads real account equity from the broker instead of its own ledger.' },
          { when: '2026-10-14', what: 'The machine rebooted before DNS was up, one auth call failed, and the service silently fell back to paper mode for eight hours with live trading enabled.', fix: 'Broker handle is kept and re-authenticated lazily; with live trading on and no broker attached, entries are refused and an alert goes out.' }
        ]
      },
      {
        id: 'meibook',
        when: 'Jun 2026',
        title: 'A notebook replacement for one-person studios',
        summary: 'MeiBook: appointments, a prepaid membership-card ledger and revenue for nail and lash studios, with no backend and no sign-up.',
        repo: 'meibook',
        href: 'https://github.com/yalili8521/meibook',
        problem: 'Every time I wanted a haircut I had to call the studio, and I kept wishing I could just book on a website. The one-person studios I go to run on a paper notebook: who has how much left on their prepaid card, who to remind tomorrow, how much actually came in this month. The English tools charge for hardware or take a cut, and none of them model a prepaid balance well.',
        built: 'A Chinese-first Progressive Web App: a fourteen-day calendar with ten-second appointment entry, a membership-card ledger in integer cents that is append-only (mistakes are corrected with an adjustment, never deleted), and revenue that separates cash received from service value from card consumption so top-ups are never counted twice. Data stays in the browser with JSON export and import. Twenty-one pure-logic assertions cover the money and date helpers.',
        broke: 'Nothing in the code. It was deliberately held at version 0.1, and the piece I wanted most as a customer, a public booking page, is still on the roadmap: the validation step said run a distribution test with real studio owners first, and that test has not been run.',
        stayed: 'A product can be finished enough to use in thirty minutes and still not be worth shipping until someone asks for it.',
        stack: ['React 18', 'Vite', 'PWA', 'localStorage'],
        mech: null
      }
    ]
  },
  work: {
    title: 'Work history',
    intro: 'A path through structural engineering, a store, and production AI.',
    rows: [
      { dates: '2025 to now', title: 'Builder and learner', org: 'Issaquah, Washington', line: 'The projects on this site, built and operated on my own account, my own store, or my own deadline.' },
      { dates: 'Aug 2025 to Nov 2025', title: 'Full-stack engineering bootcamp', org: 'Student', line: 'JavaScript, Node and React, full time. Projects: Funzmart, a toy store, and Salinaka, an eyewear store, both in React; a vacation-planning page in plain JavaScript; and a dashboard with an Express and MongoDB backend (auth, e-commerce, CRM and analytics routes) and a Vite frontend.', links: [{ label: 'funzmart demo', href: 'https://yalili8521.github.io/funzmart/' }, { label: 'funzmart code', href: 'https://github.com/yalili8521/funzmart' }, { label: 'salinaka demo', href: 'https://yalili8521.github.io/salinaka/' }, { label: 'salinaka code', href: 'https://github.com/yalili8521/salinaka' }, { label: 'vacation page demo', href: 'https://jsproject-yl.vercel.app' }, { label: 'JsProject_YL', href: 'https://github.com/yalili8521/JsProject_YL' }, { label: 'dashboard demo', href: 'https://node-js-yl-a76s.vercel.app' }, { label: 'NodeJS-YL', href: 'https://github.com/yalili8521/NodeJS-YL' }] },
      { dates: 'Jan 2025 to 2026', title: 'Business owner, Amazon store', org: 'TY Little Store, Amazon brand Heraphus', line: 'One product line from sourcing to roughly fifty to sixty thousand dollars in cumulative sales in 2025.' },
      { dates: 'Apr 2024 to Apr 2025', title: 'Structural Engineer', org: 'KPFF Consulting Engineers, Special Projects Group, Seattle', line: 'Marine structures for several ports: bulkheads, pile caps, precast and cast-in-place elements, coordinated with utility, geotechnical and mechanical teams. Built a nonlinear spring modeling tool wired into SAP2000 through Excel VBA. Led the seismic analysis of timber docks for the Ballard Pier study. Shop drawing review and construction support for Port of Seattle Terminal 91.' },
      { dates: 'May 2023 to Mar 2024', title: 'Structural Engineer', org: 'PBS Engineering and Environmental', line: 'Seawall stabilization and drainage design, retaining walls, bridge calculations and inspections for municipal clients in Oregon and Washington.' },
      { dates: 'Oct 2021 to May 2023', title: 'Staff Engineer and Project Leader', org: 'APA, The Engineered Wood Association, Tacoma', line: 'Engineered-wood product evaluations against ASCE, IBC and IRC; designed the structure and lateral loads for a destructive full-house test.' },
      { dates: 'Jan 2019 to Aug 2021', title: 'Ph.D., Timber Engineering', org: 'Mississippi State University', line: 'Finite element models of wood connections validated against lab data; image-based machine learning on wood cross-sections.' },
      { dates: 'Jun 2018 to Jan 2019', title: 'Structural Engineer', org: 'Tongji Architectural Design and Research Institute, Shanghai', line: 'Structural analysis and proposals for a long-span visitor center, a high-rise steel bank and a middle school.' }
    ],
    note: 'Licensed Professional Engineer, Washington.'
  },
  how: {
    title: 'How I work',
    rows: [
      { title: 'Write the evaluation before the feature', line: 'Pre-registered pass criteria, no in-sample winner selection, negative results kept with their specs.' },
      { title: 'Every outage becomes a fix and a test', line: 'The incident table under Auto trading systems is the record. Nothing is patched without a regression test that reproduces it.' },
      { title: 'A second model reads what the first one wrote', line: 'Codex reviews Claude, a critic grades the producer, a human approves rule changes.' },
      { title: 'Optimize it when there is an opportunity', line: 'Every system here started as the simplest version that ran, then got improved where a real failure or a real user showed the opportunity.' }
    ]
  },
  skills: [
    { group: 'AI and agents', items: ['Claude API and Claude Code', 'Multi-agent orchestration, Model Context Protocol servers', 'Evaluation loops with critic agents', 'Scheduled agent pipelines'] },
    { group: 'Software', items: ['Python', 'JavaScript and React', 'FastAPI and Flask services, REST integrations', 'Windows services, Cloudflare Tunnel, SQLite'] },
    { group: 'Data and engineering', items: ['Backtesting and walk-forward validation', 'pandas, NumPy, scikit-learn', 'Finite element analysis, SAP2000 and ABAQUS'] }
  ],
  contact: {
    title: 'Contact',
    line: 'About positions and opportunities in applied AI, solution engineering or forward-deployed work, I would like to talk. Greater Seattle, or remote in the US.',
    methods: [
      { label: 'Email', value: 'yalili8521@gmail.com', href: 'mailto:yalili8521@gmail.com' },
      { label: 'GitHub', value: 'github.com/yalili8521', href: 'https://github.com/yalili8521' },
      { label: 'Location', value: 'Issaquah, Washington' }
    ],
    footer: '© 2026 Yali Li'
  }
};

/* ------------------------------------------------------------------ */
/*  Hooks                                                               */
/* ------------------------------------------------------------------ */

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
      { threshold: 0.08 }
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
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
    const isDark = theme === 'dark';
    const iconColor = isDark ? '%23fafafa' : '%23000000';
    const iconBg = isDark ? '%23050505' : '%23fcfcfc';
    const svg = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='${iconBg}'/%3E%3Ctext x='50%25' y='58%25' text-anchor='middle' dominant-baseline='middle' font-family='Georgia,serif' font-style='italic' font-weight='400' font-size='18' fill='${iconColor}'%3EYL%3C/text%3E%3C/svg%3E`;
    document.querySelector('link[rel="icon"]')?.setAttribute('href', svg);
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

/* ------------------------------------------------------------------ */
/*  Mechanism animations, one per chapter, each the real mechanism      */
/* ------------------------------------------------------------------ */

const MONO = "'JetBrains Mono', monospace";

function Box({ x, y, w, h, title, sub, strong }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={h} rx="2" fill={strong ? 'var(--bg-elevated)' : 'var(--bg)'} stroke={strong ? 'var(--accent)' : 'var(--rule)'} strokeWidth={strong ? 1.5 : 1} />
      <text x={w / 2} y={sub ? h / 2 - 4 : h / 2 + 4} textAnchor="middle" fontFamily={MONO} fontSize="12" fontWeight="500" fill="var(--ink)">{title}</text>
      {sub && <text x={w / 2} y={h / 2 + 14} textAnchor="middle" fontFamily={MONO} fontSize="8" letterSpacing="0.8" fill="var(--ink-dim)">{sub}</text>}
    </g>
  );
}

function MechCalendar() {
  const cols = 14, rows = 6, cell = 26, gap = 6;
  const w = cols * (cell + gap), h = rows * (cell + gap);
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const manual = r < 2 && (i % 3 === 0 || i % 7 === 0);
      const agent = r >= 2;
      if (!manual && !agent) continue;
      const delay = (r * cols + c) * 0.045;
      cells.push(
        <rect key={i} x={c * (cell + gap)} y={r * (cell + gap)} width={cell} height={cell} rx="2"
          fill={agent ? 'var(--accent)' : 'var(--ink-faint)'} opacity="0">
          <animate attributeName="opacity" values={agent ? '0;0.85;0.85;0' : '0;0.45;0.45;0'} keyTimes="0;0.08;0.85;1" dur="9s" begin={`${delay}s`} repeatCount="indefinite" />
        </rect>
      );
    }
  }
  return (
    <svg viewBox={`0 0 ${w + 160} ${h + 10}`} preserveAspectRatio="xMidYMid meet" aria-label="Manual checks becoming scheduled agent runs">
      <g transform="translate(150, 5)">{cells}</g>
      <text x="0" y="22" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">MANUAL</text>
      <text x="0" y="86" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">SCHEDULED</text>
      <text x="0" y="100" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">AGENTS</text>
    </svg>
  );
}

function MechCritic() {
  return (
    <svg viewBox="0 0 900 220" preserveAspectRatio="xMidYMid meet" aria-label="Producer and critic loop">
      <Box x={60} y={70} w={200} h={70} title="producer" sub="DRAFTS AND REVISES" />
      <Box x={640} y={70} w={200} h={70} title="critic" sub="SEPARATE AGENT, 7 DIMENSIONS" strong />
      <Box x={350} y={160} w={200} h={46} title="rubric + feedback log" sub="HUMAN APPROVES CHANGES" />
      <g stroke="var(--ink-faint)" strokeWidth="1" opacity="0.4" fill="none">
        <line x1="260" y1="95" x2="640" y2="95" />
        <line x1="640" y1="115" x2="260" y2="115" />
        <line x1="450" y1="160" x2="450" y2="130" />
      </g>
      {[0, 3, 6].map((t, i) => (
        <g key={i}>
          <circle r="3" fill="var(--accent)" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="1.4s" begin={`${t}s`} repeatCount="indefinite" />
            <animate attributeName="cx" values="260;640" dur="1.4s" begin={`${t}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values="95;95" dur="1.4s" begin={`${t}s`} repeatCount="indefinite" />
          </circle>
          <circle r="3" fill="var(--ink-faint)" opacity="0">
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="1.4s" begin={`${t + 1.5}s`} repeatCount="indefinite" />
            <animate attributeName="cx" values="640;260" dur="1.4s" begin={`${t + 1.5}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values="115;115" dur="1.4s" begin={`${t + 1.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <text x="450" y="60" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="var(--ink-dim)" opacity="0">
        REVISE
        <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.2;0.6;0.65;1" dur="9s" repeatCount="indefinite" />
      </text>
      <text x="450" y="60" textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="500" fill="var(--accent)" opacity="0">
        PASS
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.66;0.72;0.95;1" dur="9s" repeatCount="indefinite" />
      </text>
      <text x="450" y="30" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">UP TO TWO ROUNDS, THEN THE CRITIQUE IS LOGGED FORWARD</text>
    </svg>
  );
}

function MechToken() {
  return (
    <svg viewBox="0 0 900 220" preserveAspectRatio="xMidYMid meet" aria-label="Execution token passing between two agents">
      <Box x={80} y={60} w={200} h={70} title="claude" sub="PRIMARY, MAY EDIT" />
      <Box x={620} y={60} w={200} h={70} title="codex" sub="REVIEWER, READ ONLY" />
      <Box x={350} y={150} w={200} h={50} title="human" sub="CHECKED BEFORE EVERY TURN" strong />
      <g stroke="var(--ink-faint)" strokeWidth="1" opacity="0.4" fill="none">
        <line x1="280" y1="95" x2="620" y2="95" />
        <line x1="450" y1="150" x2="450" y2="95" />
      </g>
      <text x="450" y="85" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">holds_token</text>
      <circle r="7" fill="none" stroke="var(--accent)" strokeWidth="2">
        <animate attributeName="cx" values="180;180;720;720;180" keyTimes="0;0.4;0.5;0.9;1" dur="6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="40;40;40;40;40" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="var(--ink-dim)" opacity="0">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="1.2s" begin="2.6s;8.6s" repeatCount="indefinite" />
        <animate attributeName="cx" values="450;450" dur="1.2s" begin="2.6s;8.6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="150;95" dur="1.2s" begin="2.6s;8.6s" repeatCount="indefinite" />
      </circle>
      <text x="450" y="30" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">ONE EXECUTION AUTHORITY PER TURN. ONLY THE REVIEWER CAN FINALIZE DONE.</text>
    </svg>
  );
}

function MechPipeline() {
  const stages = [
    { x: 20, title: 'TradingView', sub: 'ALERT' },
    { x: 200, title: 'tunnel', sub: 'CLOUDFLARE' },
    { x: 380, title: 'webhook', sub: 'PASSPHRASE, LEDGER' },
    { x: 560, title: 'executor', sub: 'SIZE, CAP, REST' },
    { x: 740, title: 'broker', sub: 'TRADOVATE' }
  ];
  return (
    <svg viewBox="0 0 900 240" preserveAspectRatio="xMidYMid meet" aria-label="Alert to order pipeline with reconciler">
      {stages.map((s, i) => <Box key={i} x={s.x} y={50} w={140} h={64} title={s.title} sub={s.sub} strong={i === 2} />)}
      <g stroke="var(--ink-faint)" strokeWidth="1" opacity="0.4" fill="none">
        {stages.slice(0, -1).map((s, i) => <line key={i} x1={s.x + 140} y1="82" x2={stages[i + 1].x} y2="82" />)}
        <path d="M 810 114 L 810 190 L 450 190 L 450 114" />
      </g>
      <circle r="3.5" fill="var(--accent)" opacity="0">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.95;1" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="cx" values="90;810" dur="3.2s" repeatCount="indefinite" />
        <animate attributeName="cy" values="82;82" dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle r="3" fill="var(--ink-dim)" opacity="0">
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.95;1" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
        <animate attributeName="cx" values="810;810;450;450" keyTimes="0;0.25;0.75;1" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="114;190;190;114" keyTimes="0;0.25;0.75;1" dur="3.2s" begin="1.6s" repeatCount="indefinite" />
      </circle>
      <text x="630" y="210" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">RECONCILER, EVERY 60 S: BROKER POSITION VS LEDGER</text>
      <text x="450" y="30" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">TWO WINDOWS SERVICES, RESTART ON CRASH, SURVIVE REBOOT</text>
    </svg>
  );
}

function MechCurves() {
  const curves = [
    { d: 'M 60 150 C 160 120, 240 170, 340 130 S 520 160, 640 140 S 780 165, 840 150', label: 'time-series momentum', delay: 0 },
    { d: 'M 60 150 C 140 140, 260 110, 360 150 S 560 120, 660 155 S 790 135, 840 160', label: 'funding cross-section', delay: 2.2 },
    { d: 'M 60 150 C 180 100, 300 140, 420 115 S 600 145, 700 120 S 800 150, 840 130', label: 'long-short momentum', delay: 4.4 }
  ];
  return (
    <svg viewBox="0 0 900 220" preserveAspectRatio="xMidYMid meet" aria-label="Three equity curves ending below the pass bar">
      <line x1="60" y1="60" x2="840" y2="60" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 6" opacity="0.7" />
      <text x="840" y="52" textAnchor="end" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-dim)">PASS BAR, WRITTEN BEFORE THE RUN</text>
      <line x1="60" y1="150" x2="840" y2="150" stroke="var(--rule)" strokeWidth="1" />
      {curves.map((c, i) => (
        <g key={i}>
          <path d={c.d} fill="none" stroke={i === 2 ? 'var(--ink)' : 'var(--ink-faint)'} strokeWidth="1.5" strokeDasharray="1200" strokeDashoffset="1200">
            <animate attributeName="stroke-dashoffset" values="1200;0;0;1200" keyTimes="0;0.25;0.9;1" dur="9s" begin={`${c.delay}s`} repeatCount="indefinite" />
          </path>
          <text x="60" y={185 + i * 13} fontFamily={MONO} fontSize="9" letterSpacing="0.6" fill="var(--ink-faint)">{c.label}</text>
        </g>
      ))}
      <g opacity="0">
        <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.72;0.78;0.95;1" dur="9s" repeatCount="indefinite" />
        <rect x="700" y="90" width="80" height="30" fill="none" stroke="var(--accent)" strokeWidth="1.5" transform="rotate(-8 740 105)" />
        <text x="740" y="110" textAnchor="middle" fontFamily={MONO} fontSize="13" fontWeight="500" fill="var(--accent)" transform="rotate(-8 740 105)">FAIL</text>
      </g>
    </svg>
  );
}


/* Ch 1: one orchestrator, six worker agents on scheduled triggers */
function MechFleet() {
  const workers = ['account-guardian', 'competitor-intel', 'ppc-manager', 'product-scout', 'customer-voice', 'listing-audit'];
  const centerXs = [90, 230, 370, 510, 650, 790];
  return (
    <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid meet" aria-label="Orchestrator coordinating six worker agents">
      <g stroke="var(--ink-faint)" strokeWidth="1" fill="none" opacity="0.4">
        {centerXs.map((x, i) => <line key={i} x1="500" y1="110" x2={x} y2="290" />)}
      </g>
      {centerXs.map((x, i) => (
        <circle key={i} r="2.5" fill="var(--accent)" opacity="0">
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="3.6s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          <animate attributeName="cx" values={`500;${x}`} dur="3.6s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          <animate attributeName="cy" values="110;290" dur="3.6s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <g transform="translate(400, 40)">
        <rect width="200" height="70" rx="2" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5">
          <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </rect>
        <text x="100" y="30" textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="1.4" fill="var(--accent)">ORCHESTRATOR</text>
        <text x="100" y="52" textAnchor="middle" fontFamily={MONO} fontSize="14" fontWeight="500" fill="var(--ink)">daily-hub</text>
      </g>
      {workers.map((w, i) => (
        <g key={i} transform={`translate(${centerXs[i] - 65}, 290)`}>
          <rect width="130" height="60" rx="2" fill="var(--bg)" stroke="var(--rule)" strokeWidth="1">
            <animate attributeName="stroke" values="var(--svg-stroke-1);var(--svg-stroke-2);var(--svg-stroke-1)" dur="4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </rect>
          <text x="65" y="25" textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="500" fill="var(--ink)">{w}</text>
          <text x="65" y="44" textAnchor="middle" fontFamily={MONO} fontSize="8" letterSpacing="0.8" fill="var(--ink-dim)">WORKER</text>
        </g>
      ))}
      <text x="500" y="385" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">EACH WORKER RUNS ON ITS OWN SCHEDULE. THE ORCHESTRATOR WRITES ONE DAILY BRIEFING AND ROUTES EXCEPTIONS TO ME.</text>
    </svg>
  );
}



/* Ch quantitivestocks: expected return as a number crossing the cost thresholds */
function MechRegress() {
  const d = 'M 60 150 C 120 150, 150 95, 210 90 S 300 170, 360 175 S 450 120, 510 110 S 600 150, 660 152 S 760 70, 840 75';
  return (
    <svg viewBox="0 0 900 260" preserveAspectRatio="xMidYMid meet" aria-label="Expected return crossing the cost thresholds into up, flat and down">
      <rect x="60" y="135" width="780" height="30" fill="var(--ink-faint)" opacity="0.12" />
      <line x1="60" y1="135" x2="840" y2="135" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="3 5" />
      <line x1="60" y1="165" x2="840" y2="165" stroke="var(--ink-faint)" strokeWidth="1" strokeDasharray="3 5" />
      <text x="56" y="139" textAnchor="end" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">+COST</text>
      <text x="56" y="169" textAnchor="end" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">-COST</text>
      <text x="850" y="90" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--accent)">UP</text>
      <text x="850" y="154" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">FLAT</text>
      <text x="850" y="215" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-dim)">DOWN</text>
      <path d={d} fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="1400" strokeDashoffset="1400">
        <animate attributeName="stroke-dashoffset" values="1400;0;0" keyTimes="0;0.6;1" dur="8s" repeatCount="indefinite" />
      </path>
      <circle r="5" fill="var(--accent)">
        <animateMotion dur="8s" keyPoints="0;1;1" keyTimes="0;0.6;1" repeatCount="indefinite" path={d} />
      </circle>
      <text x="60" y="240" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">E[RETURN] OVER TEN DAYS. SIZE = HOW FAR OUTSIDE THE BAND. INSIDE THE BAND, NO TRADE.</text>
    </svg>
  );
}


/* Ch subtracker: the inbox is scanned, receipts become dated entries on a calendar */
function MechInbox() {
  const rows = [
    { text: 'Netflix: your monthly receipt', amt: '$15.99', day: 12 },
    { text: 'Flight confirmation, SEA to SFO', amt: null, day: null },
    { text: 'iCloud+ 50 GB was renewed', amt: '$0.99', day: 3 },
    { text: 'Lunch on Thursday?', amt: null, day: null },
    { text: 'Anthropic API usage invoice', amt: '$42.10', day: 1 },
    { text: 'Progressive: auto policy payment', amt: '$118.00', day: 20 }
  ];
  const DUR = '11s';
  const t0 = (i) => (0.06 + i * 0.12).toFixed(3);
  const f = (x) => Math.min(0.999, x).toFixed(3);
  const cols = 7, cell = 18, gap = 5;
  return (
    <svg viewBox="0 0 900 300" preserveAspectRatio="xMidYMid meet" aria-label="Billing emails scanned by a model and placed on a payment calendar">
      <rect x="40" y="30" width="420" height="200" rx="2" fill="var(--bg)" stroke="var(--rule)" strokeWidth="1" />
      <text x="52" y="50" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">INBOX</text>
      {rows.map((r, i) => {
        const y = 62 + i * 27, a = Number(t0(i));
        return (
          <g key={i}>
            <rect x="46" y={y - 4} width="408" height="22" rx="2" fill="var(--tint-soft)" opacity="0">
              <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={`0;${f(a)};${f(a + 0.005)};${f(a + 0.1)};${f(a + 0.11)};1`} dur={DUR} repeatCount="indefinite" />
            </rect>
            <text x="56" y={y + 11} fontFamily={MONO} fontSize="11" fill={r.amt ? 'var(--ink)' : 'var(--ink-faint)'}>{r.text}</text>
            {r.amt && (
              <text x="446" y={y + 11} textAnchor="end" fontFamily={MONO} fontSize="10" fontWeight="500" fill="var(--tint)" opacity="0">
                <animate attributeName="opacity" values="0;0;1;1;0" keyTimes={`0;${f(a + 0.06)};${f(a + 0.08)};0.94;1`} dur={DUR} repeatCount="indefinite" />
                {r.amt}
              </text>
            )}
          </g>
        );
      })}

      <line x1="470" y1="130" x2="580" y2="130" stroke="var(--ink-faint)" strokeWidth="1" />
      <text x="525" y="118" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--tint)">MODEL</text>
      <text x="525" y="148" textAnchor="middle" fontFamily={MONO} fontSize="8" letterSpacing="0.6" fill="var(--ink-faint)">body redacted first</text>
      {rows.map((r, i) => r.amt && (
        <circle key={i} r="3" fill="var(--tint)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={`0;${f(Number(t0(i)) + 0.05)};${f(Number(t0(i)) + 0.055)};${f(Number(t0(i)) + 0.095)};${f(Number(t0(i)) + 0.1)};1`} dur={DUR} repeatCount="indefinite" />
          <animate attributeName="cx" values={`470;470;580;580`} keyTimes={`0;${f(Number(t0(i)) + 0.05)};${f(Number(t0(i)) + 0.1)};1`} dur={DUR} repeatCount="indefinite" />
          <animate attributeName="cy" values="130;130" dur={DUR} repeatCount="indefinite" />
        </circle>
      ))}

      <g transform="translate(600, 52)">
        <text x="0" y="-8" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">NEXT PAYMENTS</text>
        {Array.from({ length: 35 }, (_, d) => {
          const c = d % cols, rr = Math.floor(d / cols);
          const hit = rows.find((r) => r.day === d + 1);
          const a = hit ? Number(t0(rows.indexOf(hit))) : 0;
          return (
            <g key={d}>
              <rect x={c * (cell + gap)} y={rr * (cell + gap)} width={cell} height={cell} rx="2" fill="var(--bg)" stroke="var(--rule)" strokeWidth="1" />
              {hit && (
                <rect x={c * (cell + gap)} y={rr * (cell + gap)} width={cell} height={cell} rx="2" fill="var(--tint)" opacity="0">
                  <animate attributeName="opacity" values="0;0;0.9;0.9;0" keyTimes={`0;${f(a + 0.1)};${f(a + 0.115)};0.94;1`} dur={DUR} repeatCount="indefinite" />
                </rect>
              )}
            </g>
          );
        })}
        <text x="0" y="138" fontFamily={MONO} fontSize="10" fontWeight="500" fill="var(--ink)" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.8;0.83;0.94;1" dur={DUR} repeatCount="indefinite" />
          $177.08 A MONTH, 4 SERVICES
        </text>
      </g>
      <text x="40" y="270" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="var(--ink-faint)">EACH EMAIL IS ASKED FOUR THINGS: RECEIPT? WHICH SERVICE? HOW MUCH? HOW OFTEN? THE REST OF THE BODY NEVER LEAVES.</text>
    </svg>
  );
}

const MECHS = { regress: MechRegress, inbox: MechInbox, fleet: MechFleet, calendar: MechCalendar, critic: MechCritic, token: MechToken, pipeline: MechPipeline, curves: MechCurves };

/* ------------------------------------------------------------------ */
/*  Story row: one line closed, the whole chapter open                  */
/* ------------------------------------------------------------------ */

function StoryRow({ c, open, onToggle, index }) {
  const Mech = MECHS[c.mech];
  return (
    <article id={c.id} className={`story-row ${open ? 'open' : ''}`}>
      <button className="story-head" onClick={onToggle} aria-expanded={open} aria-controls={`${c.id}-body`}>
        <span className="story-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="story-main">
          <span className="story-title">{c.title}</span>
          <span className="story-sum">{c.summary}</span>
          <span className="story-meta">
            {c.when}
            {c.repo && <> · {c.repo}</>}
          </span>
        </span>
        <span className="story-toggle">{open ? 'Close' : 'Read'}<span className="story-arrow">{open ? ' ↑' : ' ↓'}</span></span>
      </button>

      {open && (
        <div id={`${c.id}-body`} className="story-body">
          <div className="beat"><div className="beat-label">The problem</div><p className="beat-text">{c.problem}</p></div>
          <div className="beat"><div className="beat-label">What I built</div><p className="beat-text">{c.built}</p></div>
          {Mech && <div className="agent-diagram mech"><Mech /></div>}
          <div className="beat"><div className="beat-label">What broke</div><p className="beat-text dim">{c.broke}</p></div>
          {c.incidents && (
            <div className="incidents">
              {c.incidents.map((inc, i) => (
                <div key={i} className="incident">
                  <div className="incident-when">{inc.when}</div>
                  <div>
                    <div className="incident-what">{inc.what}</div>
                    <div className="incident-fix"><span className="incident-fix-label">Fix</span>{inc.fix}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="beat"><div className="beat-label">What stayed</div><p className="beat-text stayed">{c.stayed}</p></div>
          <div className="story-foot">
            <div className="project-stack">{c.stack.map((s, j) => <span key={j} className="stack-pill">{s}</span>)}</div>
            {c.href && (
              <div className="story-links">
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="inline-link">{c.repo.split(',')[0]} on GitHub ↗</a>
                {c.href2 && <a href={c.href2} target="_blank" rel="noopener noreferrer" className="inline-link">{c.repo.split(',')[1].trim()} on GitHub ↗</a>}
                {c.demo && <a href={c.demo} target="_blank" rel="noopener noreferrer" className="inline-link">{c.demoLabel || 'Live demo'} ↗</a>}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                 */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Routing: hash-based pages, no library                                */
/* ------------------------------------------------------------------ */

const PAGES = ['projects', 'work', 'how', 'contact'];

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [page, sub] = raw.split('/');
  if (PAGES.includes(page)) return { page, sub: sub || null };
  if (page === 'story') return { page: 'projects', sub: sub || null };
  // old single-page anchors keep working
  if (site.story.chapters.some((c) => c.id === page)) return { page: 'projects', sub: page };
  return { page: 'home', sub: null };
}

function useRoute() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const onHash = () => { setRoute(parseHash()); window.scrollTo({ top: 0, behavior: 'instant' }); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function PageHead({ title, intro }) {
  return (
    <div className="page-head">
      <h1 className="page-title">{title}</h1>
      {intro && <p className="sec-intro">{intro}</p>}
    </div>
  );
}

function HomePage() {
  const cards = [
    { href: '#projects', title: 'Projects', line: 'In the order they happened. Why each exists, how it was built, what it broke.' },
    { href: '#work', title: 'Work', line: 'Structural engineering, a store, then production AI.' },
    { href: '#how', title: 'How I work', line: 'The process is always the interesting part.' },
    { href: '#contact', title: 'Contact', line: 'Email, GitHub, and where I am.' }
  ];
  return (
    <section className="page intro">
      <h1 className="h-name">{site.hero.name}</h1>
      <div className="h-role">{site.hero.role}</div>
      <div className="h-loc">{site.hero.location}</div>
      <p className="h-intro">{site.hero.intro}</p>
      <div className="h-links">
        {site.hero.links.map((l) => (
          <a key={l.href} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{l.label}</a>
        ))}
      </div>
      <div className="home-grid">
        {cards.map((c) => (
          <a key={c.href} href={c.href} className="home-card">
            <span className="home-card-title">{c.title}<span className="home-card-arrow"> →</span></span>
            <span className="home-card-line">{c.line}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function StoryPage({ sub }) {
  const [openId, setOpenId] = useState(sub);
  useEffect(() => { setOpenId(sub); }, [sub]);
  useEffect(() => {
    if (!sub) return;
    const el = document.getElementById(sub);
    if (el) setTimeout(() => el.scrollIntoView({ block: 'start', behavior: 'instant' }), 30);
  }, [sub]);
  return (
    <section className="page">
      <PageHead title={site.story.title} intro={site.story.intro} />
      <div className="card story-list">
        {site.story.chapters.map((c, index) => (
          <StoryRow key={c.id} index={index} c={c} open={openId === c.id} onToggle={() => {
            const next = openId === c.id ? null : c.id;
            setOpenId(next);
            history.replaceState(null, '', next ? `#projects/${next}` : '#projects');
          }} />
        ))}
      </div>
    </section>
  );
}

function WorkPage() {
  return (
    <section className="page">
      <PageHead title={site.work.title} intro={site.work.intro} />
      <div className="card">
        <div className="timeline">
          {site.work.rows.map((r, i) => (
            <div key={i} className={`tl-row ${i === 0 ? 'current' : ''}`}>
              <div className="tl-dot" aria-hidden="true"></div>
              <div>
                <div className="tl-title">{r.title}</div>
                <div className="tl-org">{r.org}</div>
                <div className="tl-line">{r.line}</div>
                {r.links && (
                  <div className="tl-links">
                    {r.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="inline-link">{l.label} ↗</a>)}
                  </div>
                )}
                {i === 0 && <span className="tl-chip">Current</span>}
              </div>
              <div className="tl-dates">{r.dates}</div>
            </div>
          ))}
        </div>
      </div>
      <p className="work-note">{site.work.note}</p>
    </section>
  );
}

function HowPage() {
  return (
    <section className="page">
      <PageHead title={site.how.title} intro="Four habits that run through every project here." />
      <div className="card">
        {site.how.rows.map((r, i) => (
          <div key={i} className="how-row">
            <div className="how-num">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <div className="how-title">{r.title}</div>
              <div className="how-line">{r.line}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="page">
      <PageHead title={site.contact.title} intro={site.contact.line} />
      <div className="contact-methods">
        {site.contact.methods.map((m, i) => (
          <div key={i} className="contact-method">
            <div className="contact-label">{m.label}</div>
            {m.href ? (
              <a href={m.href} className="contact-value contact-link" target={m.href.startsWith('http') ? '_blank' : undefined} rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}>{m.value}</a>
            ) : (
              <div className="contact-value">{m.value}</div>
            )}
          </div>
        ))}
      </div>
      <h2 className="skills-title">Skills</h2>
      <div className="skills-grid">
        {site.skills.map((s) => (
          <div key={s.group} className="card skills-col">
            <div className="skills-group">{s.group}</div>
            <ul className="skills-list">
              {s.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  const route = useRoute();
  const Page = { home: HomePage, projects: StoryPage, work: WorkPage, how: HowPage, contact: ContactPage }[route.page];

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <nav>
        <a className="nav-mark" href="#/">Yali Li<span>/ Engineer</span></a>
        <div className="nav-links">
          {site.nav.map((n) => (
            <a key={n.href} href={n.href} className={route.page === n.href.slice(1) ? 'active' : ''}>{n.label}</a>
          ))}
          <ThemeToggle />
        </div>
      </nav>

      <main id="main" className="narrow">
        <Page key={route.page} sub={route.sub} />
        <footer className="site-foot">
          <div>{site.contact.footer}</div>
          <div className="site-foot-links">
            {site.hero.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
        </footer>
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
