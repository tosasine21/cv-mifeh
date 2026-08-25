import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import michaela from "@/assets/michaela.png";
import certDM from "@/assets/cert-digitalny-marketing.png";
import certMK from "@/assets/cert-mistr-komunikace.png";
import certPB from "@/assets/cert-personal-brand-sell-mastery.webp";
import artNature from "@/assets/zaujmy-nature.png";
import artGames from "@/assets/zaujmy-games.png";
import artBooks from "@/assets/zaujmy-books.png";
import artSims from "@/assets/zaujmy-sims.png";
import AboutStory from "@/components/AboutStory";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Michaela Fehérová | Performance marketing × AI × psychológia" },
      {
        name: "description",
        content:
          "CV Michaely Fehérovej — začínajúca marketérka spájajúca performance marketing, PPC, AI nástroje a psychológiu zákazníka.",
      },
      { property: "og:title", content: "Michaela Fehérová | Marketing × Psychológia × AI" },
      {
        property: "og:description",
        content:
          "Performance marketing, PPC, AI workflows a psychológia zákazníka. Otvorená pre juniorné pozície v marketingu.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: `https://www.feherova.sk${michaela}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- scroll reveal ---------- */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .line-mask"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- magnetic hero name ---------- */
function NameReveal({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const fullText = lines.join(" ");

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const letters = Array.from(root.querySelectorAll<HTMLElement>(".letter"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    letters.forEach((el, i) => {
      window.setTimeout(() => el.classList.add("is-visible"), reduce ? 0 : 40 * i);
    });
    if (reduce) return;

    const state = letters.map((el) => ({ el, x: 0, y: 0, tx: 0, ty: 0 }));
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;

    const onMove = (e: PointerEvent) => (pointer = { x: e.clientX, y: e.clientY });
    const onLeave = () => (pointer = null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    const radius = 130;
    const lift = 16;
    const frame = () => {
      state.forEach((l) => {
        if (pointer) {
          const r = l.el.getBoundingClientRect();
          const dx = r.left + r.width / 2 - pointer.x;
          const dy = r.top + r.height / 2 - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < radius) {
            const p = (1 - dist / radius) ** 2;
            const n = dist || 1;
            l.tx = (dx / n) * lift * p;
            l.ty = -(Math.abs(dy) / n) * lift * p - lift * 0.35 * p;
          } else {
            l.tx = 0;
            l.ty = 0;
          }
        } else {
          l.tx = 0;
          l.ty = 0;
        }
        l.x += (l.tx - l.x) * 0.16;
        l.y += (l.ty - l.y) * 0.16;
        l.el.style.transform = `translate3d(${l.x.toFixed(2)}px, ${l.y.toFixed(2)}px, 0)`;
      });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <h1 className="name-reveal" ref={ref} aria-label={fullText}>
      {lines.map((line, lineIdx) => (
        <span className="name-line" key={lineIdx}>
          {line.split("").map((ch, i) => (
            <span className="letter" key={`${lineIdx}-${ch}-${i}`} aria-hidden="true">
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

/* ---------- animated counter ---------- */
function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur);
          setValue(Math.round(to * (1 - (1 - t) ** 3)));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{value}</span>;
}

const MARQUEE = [
  "Performance marketing",
  "PPC",
  "AI workflows",
  "Psychológia zákazníka",
  "GA4",
  "Prompt engineering",
];

const STRENGTHS = [
  {
    title: "Strategic",
    sub: "Strategické myslenie",
    text: "Rýchlo vidím vzory a súvislosti tam, kde iní vidia iba komplexnosť, a viem si predstaviť viacero ciest vpred, kým si vyberiem tú najúčinnejšiu.",
  },
  {
    title: "Relator",
    sub: "Vzťahy do hĺbky",
    text: "Buduje mi to blízke, trvácne vzťahy — v tíme aj so zákazníkom idem do hĺbky.",
  },
  {
    title: "Learner",
    sub: "Neustále učenie",
    text: "Samotný proces učenia ma poháňa viac než výsledok, preto si priebežne dopĺňam certifikácie\u00A0\na nové nástroje.",
  },
  {
    title: "Intellection",
    sub: "Hĺbka premýšľania",
    text: "Rada si veci premyslím do detailu, som introspektívna a vyhľadávam priestor na sústredené uvažovanie pred rozhodnutím.",
  },
  {
    title: "Individualization",
    sub: "Práca s jedinečnosťou",
    text: "Zaujímajú ma jedinečné vlastnosti každého človeka — to isté prenášam aj do segmentácie\u00A0\na chápania rôznych typov zákazníkov.",
  },
];

function Index() {
  useReveal();
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="reveal in">
            <p className="eyebrow">Marketing × Psychológia × AI</p>
            <NameReveal lines={["Michaela", "Fehérová"]} />
            <p className="lede strong">
              Zaujíma ma, čomu ľudia dôverujú a čo ich presvedčí urobiť ďalší krok.
            </p>
            <p className="lede">
              Som začínajúca marketérka so zameraním na performance marketing, PPC, AI a psychológiu
              zákazníka. Prepájam porozumenie ľuďom s technológiami, dátami a kreatívnym myslením.
            </p>
            <div className="cta-row">
              <a className="btn btn-solid" href="#kontakt">
                Kontakt
              </a>
              <a className="btn btn-outline-dark" href="#o-mne">
                O mne ↓
              </a>
            </div>
          </div>
          <div className="hero-photo-wrap">
            <span className="float-chip c1">PPC</span>
            <span className="float-chip c2">AI</span>
            <span className="float-chip c3">Psychológia</span>
            <span className="float-chip c4">Marketing</span>
            <span className="float-chip c5">Komunikácia</span>
            <img className="hero-photo" src={michaela} alt="Portrét Michaely Fehérovej" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((word, i) => (
            <span key={i}>
              {word}
              <i />
            </span>
          ))}
        </div>
      </div>

      {/* O MNE — scrollytelling story */}
      <AboutStory />


      {/* STUDIUM */}
      <section className="studium reveal" id="studium">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Štúdium</p>
            <h2 className="line-mask">
              <span>Vzdelanie a kurzy</span>
            </h2>
          </div>
          <div className="edu-cols">
            <div className="edu-block card reveal reveal-d1">
              <h3>Formálne vzdelanie</h3>
              <div className="edu-entry">
                <div className="school">Digitálny marketing: certifikované štúdium</div>
                <div className="meta">Digitálna univerzita · 130 hodín, 16 celodňových školení</div>
                <div className="detail">Úlohy, záverečná skúška, certifikát. Ukončené.</div>
              </div>
              <div className="edu-entry">
                <div className="school">Psychológia</div>
                <div className="meta">
                  Univerzita Pavla Jozefa Šafárika v Košiciach, Katedra psychológie · 2019 – 2024
                </div>
                <div className="detail">Ukončené vysokoškolské vzdelanie I. stupňa</div>
              </div>
              <div className="edu-entry">
                <div className="school">Sociálno-výchovný pracovník</div>
                <div className="meta">
                  Stredná pedagogická škola sv. Cyrila a Metoda v Košiciach · 2011 – 2015
                </div>
                <div className="detail">Úplné stredné odborné vzdelanie</div>
              </div>
              <div className="edu-entry edu-entry-upcoming">
                <div className="school">PPC Masterclass</div>
                <div className="meta">Digitálna univerzita · 11/2026</div>
                <div className="detail">Idem sa zlepšovať.</div>
              </div>
            </div>
            <div className="edu-block card reveal reveal-d2">
              <h3>Online kurzy</h3>
              <ul className="course-list">
                <li>
                  <span className="course-title">
                    Virálny social media manager za 90 dní a AI tréning
                  </span>
                  <br />
                  Digitálci (R. Kiavčin)
                </li>
                <li>
                  <span className="course-title">Viral Flow</span>
                  <br />
                  Devin Jatho
                </li>
                <li>
                  <span className="course-title">Digitálna predajná mašina</span>
                  <br />
                  Digital Story
                </li>
                <li>
                  <span className="course-title">Personal Brand Sell Mastery</span>
                  <br />
                  Digital Story
                </li>
                <li>
                  <span className="course-title">The 1% Mistr Komunikace</span>
                  <br />
                  Václav Tomanec
                </li>
              </ul>
            </div>
          </div>
          <div className="split">
            <div className="split-card card reveal reveal-d1">
              <h3>Jazyky</h3>
              <div className="lang-row">
                <span>Slovenský jazyk</span>
                <span className="level">Materinský jazyk</span>
              </div>
              <div className="lang-row">
                <span>Anglický jazyk</span>
                <span className="level">B1 · aktívne sa zlepšujem</span>
              </div>
            </div>
            <div className="split-card card reveal reveal-d2">
              <h3>Dobrovoľníctvo a projekty</h3>
              <div className="org">Slovenská asociácia študentov a absolventov psychológie</div>
              <div className="role">Organizácia eventov · Content ideas &amp; content creation</div>
              <div className="period">09/2019 – 09/2021</div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFIKATY */}
      <section className="certifikaty reveal" id="certifikaty">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Doklady</p>
            <h2 className="line-mask">
              <span>Certifikáty</span>
            </h2>
          </div>
          <div className="cert-grid">
            {[
              { src: certDM, alt: "Certifikát Digitálny marketing", label: "Certifikát: Digitálny marketing" },
              { src: certMK, alt: "Certifikát Mistr komunikace", label: "Certifikát: Mistr komunikace" },
              { src: certPB, alt: "Certifikát Personal Brand Sell Mastery", label: "Certifikát: Personal Brand Sell Mastery" },
            ].map((c) => (
              <button
                type="button"
                className="cert-item reveal reveal-d1"
                key={c.label}
                onClick={() => setLightbox({ src: c.src, alt: c.alt })}
              >
                <span className="cert-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <span className="cert-label">{c.label}</span>
                <span className="cert-hint">klikni na zobrazenie</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button
            type="button"
            className="lightbox-close"
            aria-label="Zavrieť"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img src={lightbox.src} alt={lightbox.alt} onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* SKILLS */}
      <section className="skills reveal" id="skills">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Čo viem</p>
            <h2 className="line-mask">
              <span>Skills</span>
            </h2>
          </div>
          <div className="skills-grid">
            <div className="skill-card card reveal reveal-d1">
              <span className="chip chip-violet">Performance marketing</span>
              <h3>Google Ads · Meta Ads · GA4</h3>
              <p>
                Google Ads, Meta Ads, GA4, Google Tag Manager, Meta Pixel, základy SEO, nadobudnuté
                certifikovaným štúdiom na Digitálnej univerzite.
                {"\n"}Teraz hľadám príležitosť premeniť tieto znalosti na reálnu prax na živých kampaniach.
              </p>
            </div>
            <div className="skill-card card reveal reveal-d2">
              <span className="chip chip-coral">AI a automatizácia</span>
              <h3>Prompt engineering &amp; workflows</h3>
              <p>
                Aktívne používam AI nástroje ako súčasť bežnej práce, nielen na generovanie textu, ale
                na tvorbu vlastných workflowov, promptov a agentov. Pracujem s Claude aj ďalšími LLM
                modelmi, venujem sa prompt engineeringu a učím sa Claude Code. V Higgsfield generujem
                vizuály, viem prepájať MCP a experimentovala som aj s Marketing Studio.
              </p>
            </div>
            <div className="skill-card card reveal reveal-d3">
              <span className="chip chip-mint">Psychológia zákazníka</span>
              <h3>Spotrebiteľské správanie</h3>
              <p>
                Vzdelanie v psychológii{"\u00A0"} prepájam s pochopením spotrebiteľského správania: prečo
                človek klikne, čo ho motivuje k nákupu, čo ho naopak odradí.
              </p>
            </div>
          </div>

          <div className="strengths-head">
            <p className="eyebrow" style={{ color: "var(--violet)", marginBottom: 0 }}>
              Gallup CliftonStrengths® Top 5
            </p>
          </div>
          <p className="strengths-source">
            Oficiálne výsledky assessmentu Gallup CliftonStrengths, Michaela Fehérová, 05/2026
          </p>
          <div className="strength-grid">
            {STRENGTHS.map((s, i) => (
              <div className="strength-item reveal" key={s.title}>
                <div className="strength-num">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3>
                    {s.title} <small>{s.sub}</small>
                  </h3>
                  <p>{s.text}</p>
                  {s.note && <p className="note">{s.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ZAUJMY */}
      <section className="zaujmy reveal" id="zaujmy">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Mimo práce</p>
            <h2 className="line-mask">
              <span>Záujmy</span>
            </h2>
          </div>
          <div className="free-grid">
            <div className="free-card card reveal reveal-d1">
              <div className="free-art">
                <img src={artNature} alt="Ilustrácia skalnej rokliny s vodopádom a rebríkom" loading="lazy" width={1024} height={768} />
                <span className="spark spark-1" aria-hidden="true" />
                <span className="spark spark-2" aria-hidden="true" />
                <span className="spark spark-3" aria-hidden="true" />
              </div>
              <h3>Príroda</h3>
              <p>Najviac ma nabíja čas strávený v prírode, milujem Slovenský raj.</p>
            </div>
            <div className="free-card card reveal reveal-d2">
              <div className="free-art">
                <img src={artGames} alt="Ilustrácia hracieho stola so spoločenskou hrou" loading="lazy" width={1024} height={768} />
                <div className="art-die3d" aria-hidden="true">
                  <div className="die3d">
                    <span className="die-face die-f1" />
                    <span className="die-face die-f2" />
                    <span className="die-face die-f3" />
                    <span className="die-face die-f4" />
                    <span className="die-face die-f5" />
                    <span className="die-face die-f6" />
                  </div>
                  <span className="die-shadow" />
                </div>
              </div>
              <h3>Čas s priateľmi pri hrách</h3>
              <p>Rada si s priateľmi zahrám spoločenské hry, Ticket to Ride a Dixit mám najradšej.</p>
            </div>
            <div className="free-card card reveal reveal-d3">
              <div className="free-art">
                <img src={artBooks} alt="Ilustrácia kôpky kníh s otvorenou knihou" loading="lazy" width={1024} height={768} />
                <span className="spark spark-1" aria-hidden="true" />
                <span className="spark spark-2" aria-hidden="true" />
              </div>
              <h3>Knihy</h3>
              <p>
                Keď si chcem oddýchnuť pri knihe, siahnem najčastejšie po beletrii alebo knihách o
                sebarozvoji.
              </p>
            </div>
            <div className="free-card card reveal reveal-d4">
              <div className="free-art">
                <img src={artSims} alt="Ilustrácia postavy pri počítači v izbe s rastlinami" loading="lazy" width={1024} height={768} />
                <svg className="plumbob" viewBox="0 0 40 60" aria-hidden="true">
                  <polygon points="20,2 34,22 20,58 6,22" fill="#3BE07A" />
                  <polygon points="20,2 34,22 20,58" fill="#12B85A" />
                  <polygon points="20,2 20,58 6,22" fill="#7DF7A9" opacity="0.85" />
                </svg>
              </div>
              <h3>The Sims</h3>
              <p>
                Nezačalo to u mňa v detstve, ale na VŠ. O hre The Sims sa mi podarilo spraviť aj bakalársku prácu,&nbsp; kde som skúmala rozdiely v cieľoch v simulačných hrách a reálnom živote u mladých dospelých.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section className="contact reveal" id="kontakt">
        <div className="wrap">
          <p className="eyebrow">SPOJME SA</p>
          <h2 className="line-mask">
            <span>Otvorená pre junior pozície{"\n"}v marketingu</span>
          </h2>
          <p className="contact-intro">
            Hľadám pozíciu, kde tieto vedomosti rozšírim a premením na praktické skúsenosti.
          </p>
          <div className="cta-row">
            <a className="btn btn-solid" href="mailto:michaela.feherova@gmail.com">
              Napísať e-mail
            </a>
            <a className="btn btn-outline-dark" href="/Michaela_Feherova_CV.pdf" download>
              Stiahnuť CV
            </a>
          </div>
          <div className="contact-details">
            <a href="mailto:michaela.feherova@gmail.com">michaela.feherova@gmail.com</a>
            <a href="tel:+421904432213">+421 904 432 213</a>
            <a href="https://www.linkedin.com/in/michaela-feherova/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <span>Bratislava/Remote</span>
          </div>
        </div>
      </section>

      <footer>© Michaela Fehérová</footer>
    </>
  );
}
