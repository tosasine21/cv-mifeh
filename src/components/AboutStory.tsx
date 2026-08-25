import { useEffect, useRef, useState } from "react";
import freud from "@/assets/freud.jpg";
import mozog from "@/assets/mozog.png";

type Scene = {
  id: string;
  label: string;
  sub?: string;
  milestone: string;
  visual?: "freud" | "point" | "psy" | "ikea" | "merge" | "digital" | "loop" | "circle";
  body: React.ReactNode;
};

const SCENES: Scene[] = [
  {
    id: "s1",
    label: "Stredná škola",
    milestone: "Začiatok",
    visual: "freud",
    body: (
      <>
        <h3>
          Všetko sa to začalo
          <br />
          na strednej škole.
        </h3>
        <p>
          Keď sme na hodine rozoberali Freuda, úplne ma to pohltilo a fascinovalo.{"\u00A0"}Prečítala som jeho knihy a išla do hĺbky.
          {"\n"}{"\u00A0"}Rozhodla som sa ísť študovať psychológiu.
        </p>
        <p className="story-q">Prečo sa ľudia správajú tak, ako sa správajú?{"\u00A0"}</p>
        <p className="story-note">Prečo tak konajú? Čo ich vedie k ich presvedčeniam a postojom?</p>
      </>
    ),
  },
  {
    id: "s2",
    label: "Cieľavedomosť a zodpovednosť",
    milestone: "Jeden bod",
    visual: "point",
    body: (
      <>
        <h3>
          Chýbal mi jediný bod.
          <br />
          <span className="h3-sub">Bola som prvá pod čiarou.</span>
        </h3>
        <p>Na prijatie na psychológiu som sa prvýkrát nedostala. Chýbal mi jeden bod.</p>
        <p>Skúsila som to znova. A tentoraz som sa na štúdium dostala.</p>
        <p className="story-note">
          Táto skúsenosť mi ukázala, že keď mi na niečom záleží, neodradí ma jeden neúspešný pokus.
        </p>
      </>
    ),
  },
  {
    id: "s3",
    label: "2019 — 2024",
    sub: "UPJŠ Košice · Psychológia",
    milestone: "Psychológia",
    visual: "psy",
    body: (
      <>
        <h3>Čo som si odniesla zo štúdia psychológie?</h3>
        <p>
          Štúdium psychológie mi nedalo len odborné znalosti. Najmä vďaka výskumu ma naučilo
          premýšľať nad problémami v širšom kontexte, pracovať s informáciami a dotiahnuť veci do
          konca. Práve tieto schopnosti dnes prenášam aj do marketingu.
        </p>
        <p className="story-note">
          <strong>Open-minded prístup</strong> — naučila som sa pozerať na problémy z viacerých
          perspektív, nespoliehať sa na prvý dojem a vnímať širší kontext.
        </p>
        <p className="story-note">
          <strong>Systematické myslenie</strong> — výskum, práca s dátami a odbornou literatúrou ma
          naučili pracovať štruktúrovane, overovať si informácie a nehľadať len rýchle, povrchné
          riešenia.
        </p>
        <p className="story-note">
          <strong>Schopnosť dotiahnuť veci do konca</strong> — výskumná práca ma naučila vydržať pri
          komplexnej úlohe, pracovať s veľkým množstvom informácií a postupne sa dopracovať k
          výsledku.
        </p>
      </>
    ),
  },
  {
    id: "s4",
    label: "Objav",
    milestone: "Marketing",
    visual: "merge",
    body: (
      <>
        <h3>Prečo marketing?</h3>
        <p>
          K marketingu som sa prvýkrát dostala cez krátky online kurz. Už vtedy som mala pocit, že
          som narazila na niečo, čo ma prirodzene baví a chcem tomu viac rozumieť.
        </p>
        <p>
          Postupne som v marketingu našla spojenie oblastí, ktoré ma zaujímajú najviac:{" "}
          <strong>psychológie, kreativity, technológií, dát a neustáleho vzdelávania.</strong>
        </p>
        <p>
          Psychológia ma naučila všímať si ľudí, ich správanie a súvislosti. Marketing mi k tomu
          pridal priestor premýšľať, tvoriť, experimentovať a hľadať, čo skutočne funguje.
        </p>
        <p className="story-note">
          <strong>Za každou kampaňou vidím človeka.</strong> Baví ma pozerať sa pod povrch, hľadať
          súvislosti a pochopiť, prečo niečo funguje tak, ako funguje.
        </p>
      </>
    ),
  },
  {
    id: "s5",
    label: "Prax",
    sub: "IKEA Bratislava",
    milestone: "Prax",
    visual: "ikea",
    body: (
      <>
        <h3>Dešifrovanie zákazníckych problémov</h3>
        <p>
          V IKEA som zistila, že naozaj neexistuje nič také ako „bežná zákaznícka otázka“.
        </p>
        <p>
          Napríklad: <strong>„Udrží táto skriňa moje dieťa, keď sa na ňu zavesí?“</strong>
        </p>
        <p>
          Od stratených súčiastok a reklamácií až po otázky, na ktoré sa odpoveď nedala nájsť v
          návode. Každú situáciu bolo najskôr potrebné správne pochopiť a potom nájsť riešenie.
        </p>
        <p className="story-note">
          Naučila som sa <strong>počúvať, pýtať sa správne otázky a všímať si aj to, čo človek
          nepovie priamo.</strong>
        </p>
        <p className="story-note">
          Práve schopnosť dostať sa od otázky k skutočnej potrebe človeka si dnes prenášam aj do
          marketingu.
        </p>
      </>
    ),
  },
  {
    id: "s6",
    label: "Stratégia",
    milestone: "Stratégia",
    visual: "digital",
    body: (
      <>
        <h3>Čo sa dá zlepšiť?{"\u00A0"}</h3>
        <p>
          V marketingu ma preto netiahne len tvorba obsahu či nastavovanie nástrojov.
        </p>
        <p className="story-q">Prečo človek nakúpi alebo nenakúpi?{"\u00A0"} Prečo odíde zo stránky? Prečo nedokončil nákup?{"\u00A0"}</p>
        <p className="story-note">
          Ako sa dá pomocou dát, kreatívy a AI komplexne postaviť riešenie?
        </p>
      </>
    ),
  },
  {
    id: "s7",
    label: "Dnes",
    sub: "Digitálna univerzita · certifikované štúdium",
    milestone: "Dnes",
    visual: "loop",
    body: (
      <>
        <h3>PPC · Stratégia · AI</h3>
        <p>
          Dnes mám za sebou certifikované štúdium na Digitálnej univerzite a cielene sa rozvíjam v
          marketingovej stratégii a AI nástrojoch.
        </p>
      </>
    ),
  },
];


/* ---------- ink visuals ---------- */
function Visual({ kind, animate }: { kind: Scene["visual"]; animate?: boolean }) {
  if (kind === "freud" || kind === "circle") {
    const small = kind === "circle";
    return (
      <figure className={`ink-plate${small ? " ink-plate-sm" : ""}`}>
        <img src={freud} alt="Archívna fotografia Sigmunda Freuda" loading="lazy" />
        <svg className="ink-scribble" viewBox="0 0 200 120" aria-hidden="true">
          <path d="M8 96 C40 70 62 104 96 78" />
          <path d="M20 110 C58 96 74 114 120 100" />
          <circle cx="164" cy="30" r="16" />
          <path d="M150 46 L178 14" />
        </svg>
        <figcaption>Sigmund Freud · archív</figcaption>
      </figure>
    );
  }
  if (kind === "point") {
    return (
      <svg className="ink-svg" viewBox="0 0 260 200" aria-hidden="true">
        <path className="ink-line" d="M20 170 C90 170 120 150 150 96 C170 60 200 44 236 40" />
        <circle className="ink-dot-open" cx="150" cy="96" r="7" />
        <circle className="ink-dot-fill" cx="236" cy="40" r="9" />
        <text className="ink-label" x="16" y="192">
          +1
        </text>
      </svg>
    );
  }
  if (kind === "psy") {
    return (
      <figure className="ink-plate ink-plate-brain">
        <img src={mozog} alt="Kreslený mozog" loading="lazy" />
      </figure>
    );
  }
  if (kind === "ikea") {
    return (
      <svg className="ink-svg" viewBox="0 0 260 200" aria-hidden="true">
        <path className="ink-line" d="M28 150 C70 150 66 60 118 60" />
        <path className="ink-line" d="M118 60 C170 60 168 128 232 128" />
        <circle className="ink-dot-open" cx="28" cy="150" r="8" />
        <circle className="ink-dot-fill" cx="232" cy="128" r="8" />
        <path className="ink-line ink-faint" d="M60 178 L200 178" />
      </svg>
    );
  }
  if (kind === "merge") {
    return (
      <svg
        className={`ink-svg ink-merge${animate ? " merge-animate" : ""}`}
        viewBox="0 0 260 200"
        aria-hidden="true"
      >
        <circle className="ink-o o-a" cx="104" cy="82" r="46" />
        <circle className="ink-o o-b" cx="156" cy="82" r="46" />
        <circle className="ink-o o-c" cx="130" cy="126" r="46" />
        <text className="ink-label ink-label-sm" x="130" y="190" textAnchor="middle">
          psychológia · marketing · AI
        </text>
      </svg>
    );
  }
  if (kind === "digital") {
    return (
      <svg className="ink-svg" viewBox="0 0 260 200" aria-hidden="true">
        <rect className="ink-o" x="34" y="36" width="192" height="118" rx="10" />
        <path className="ink-line ink-faint" d="M34 66 L226 66" />
        <path className="ink-line" d="M64 128 L100 100 L134 116 L172 74 L200 88" />
        <circle className="ink-dot-fill" cx="172" cy="74" r="6" />
      </svg>
    );
  }
  return null;
}

const LOOP = ["Štruktúra", "Jasná hypotéza", "Test", "Vyhodnotenie", "OPAKOVANIE\n"];

function LoopProcess({ active }: { active: number }) {
  return (
    <div className="loop-flow" aria-label="Štruktúra, Jasná hypotéza, Test, Vyhodnotenie, Iterácia">
      {LOOP.map((s, i) => (
        <span
          key={s}
          className={`loop-step${active > 0.45 ? " on" : ""}`}
          style={{ transitionDelay: `${i * 140}ms` }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export default function AboutStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const desktop = !reducedMotion;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReducedMotion(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    if (!desktop) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const v = total > 0 ? -rect.top / total : 0;
        setP(Math.min(1, Math.max(0, v)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [desktop]);

  const n = SCENES.length;
  const pos = p * (n - 1);
  const mergeIndex = SCENES.findIndex((s) => s.visual === "merge");
  const [mergeAnimated, setMergeAnimated] = useState(false);
  const activeIndex = Math.round(pos);
  useEffect(() => {
    if (desktop && activeIndex === mergeIndex) setMergeAnimated(true);
  }, [desktop, activeIndex, mergeIndex]);

  return (
    <section className="story" id="o-mne">
      <div
        className="story-wrap"
        ref={wrapRef}
        style={desktop ? { height: `${n * 95}vh` } : undefined}
      >
        <div className="story-stage">
          <div className="wrap story-head">
            <p className="eyebrow">O mne</p>
            <h2>Od psychológie ku marketingu</h2>
            <p className="story-note">{"\n"}</p>
          </div>

          <div
            className="story-track"
            style={
              desktop
                ? { transform: `translate3d(${-pos * 100}vw, 0, 0)`, width: `${n * 100}vw` }
                : undefined
            }
          >
            {SCENES.map((s, i) => {
              const d = pos - i;
              const near = Math.max(0, 1 - Math.abs(d));
              const style = desktop
                ? ({
                    opacity: 0.06 + 0.94 * Math.pow(near, 0.8),
                    ["--near" as string]: near,
                    ["--dir" as string]: d,
                  } as React.CSSProperties)
                : undefined;
              return (
                <article
                  key={s.id}
                  className={`story-scene${desktop ? "" : " reveal"}`}
                  style={style}
                >
                  <div className="scene-inner">
                    <div className="scene-text">
                      <p className="scene-label">{s.label}</p>
                      {s.sub && <p className="scene-sub">{s.sub}</p>}
                      {s.body}
                      {s.visual === "loop" && <LoopProcess active={desktop ? near : 1} />}
                    </div>
                    {s.visual && s.visual !== "loop" && (
                      <div
                        className="scene-visual"
                        style={
                          desktop
                            ? { transform: `translate3d(${d * -34}px, 0, 0) scale(${0.94 + 0.06 * near})` }
                            : undefined
                        }
                      >
                        <Visual kind={s.visual} animate={s.visual === "merge" && mergeAnimated} />
                      </div>
                    )}
                  </div>
                  <span className="scene-index">{String(i + 1).padStart(2, "0")}</span>
                </article>
              );
            })}
          </div>

          <div className="story-timeline" aria-hidden="true">
            <div className="tl-rail">
              <div
                className="tl-fill"
                style={{ transform: `scaleX(${desktop ? p : 0})` }}
              />
            </div>
            <div className="tl-marks">
              {SCENES.map((s, i) => {
                const state = !desktop
                  ? ""
                  : pos >= i - 0.4 && pos <= i + 0.4
                    ? " now"
                    : pos > i
                      ? " past"
                      : "";
                return (
                  <span key={s.id} className={`tl-mark${state}`}>
                    <i />
                    <em>{s.milestone}</em>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
