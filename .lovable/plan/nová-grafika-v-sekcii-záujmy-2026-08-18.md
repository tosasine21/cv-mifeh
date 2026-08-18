# Nová grafika v sekcii Záujmy

Nahradím súčasné jednoduché ikony štyrmi ilustrovanými, rozprávkovými kartami s jemnou animáciou.

## Čo vznikne

Štyri karty s vlastnou ilustráciou v jednotnom štýle (mäkké kreslené tvary, paleta webu — ink, coral, violet, mint, gold):

1. **Príroda** — štylizovaná scéna Slovenského raja: skaly, ihličnatý les, drevené rebríky, potok, ranná hmla.
2. **Čas s priateľmi pri hrách** — herný stôl zhora: hracia doska, kocky, meeple figúrky, karty (odkaz na Ticket to Ride a Dixit bez použitia log).
3. **Knihy** — kôpka kníh s otvorenou knihou, z ktorej vychádzajú drobné ilustračné prvky.
4. **The Sims** — zelený plumbob (kosoštvorec) vznášajúci sa nad štylizovanou postavičkou.

## Ako to bude vyzerať a hýbať sa

- AI ilustrácia tvorí vrchnú/pozadovú vrstvu karty, text zostáva čitateľný cez jemný prechod.
- Nad ilustráciou je animovaná SVG vrstva: rotujúci a vznášajúci sa plumbob, padajúce lístie pri prírode, jemne sa kotúľajúca kocka, listujúca stránka pri knihách.
- Pri hover sa ilustrácia mierne priblíži a nakloní, karta získa jemný tieň.
- Animácie sú pomalé a nenápadné; pri `prefers-reduced-motion` sa vypnú.

## Technické poznámky

- Ilustrácie vygenerujem cez imagegen (transparentné PNG tam, kde treba), uložím do `src/assets/` a externalizujem cez `lovable-assets` ako `.asset.json` pointery, rovnako ako existujúce fotky.
- V `src/routes/index.tsx` prepíšem blok `.free-grid` (riadky ~527–600): každá karta dostane `<div className="free-art">` s `<img>` + inline animovaným SVG namiesto súčasnej `.icon` SVG ikony.
- Nové štýly (`.free-art`, plávanie, rotácia plumbobu, hover) pridám do `src/styles.css` k existujúcim štýlom sekcie záujmov, s použitím existujúcich CSS premenných.
- Obsah textov, poradie kariet a reveal animácie zostávajú nezmenené.
