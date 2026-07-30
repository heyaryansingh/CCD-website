// CCD generic page renderer — fills canvas placeholders from public/siteData.js.
// SCAFFOLD CONVENTION (assign these IDs to elements in the editor; every ID is
// optional — the renderer silently skips anything the page doesn't have):
//   Hero:      #pageEyebrow #pageTitle #pageAccent #pageBody #heroCta(button)
//   Section i (1-based, top to bottom):
//     #sec{i}Eyebrow #sec{i}Title #sec{i}Body #sec{i}Cta(button)
//     stats:    #sec{i}Stat{j}Value  #sec{i}Stat{j}Label      (j 1-based)
//     steps:    #sec{i}Step{j}N #sec{i}Step{j}Title #sec{i}Step{j}Body
//     cards:    #sec{i}Card{j}Title #sec{i}Card{j}Body #sec{i}Card{j}Btn(button)
//     timeline: #sec{i}Item{j}Year #sec{i}Item{j}Title #sec{i}Item{j}Body
// Repeater-based sections (partner wall, team, projects, news) bind to CMS
// datasets in the editor instead — this renderer leaves them alone.

function set($w, sel, fn) {
  try { const el = $w(sel); if (el) fn(el); } catch (e) { /* element not on page */ }
}
function text($w, sel, v) { if (v) set($w, sel, el => { el.text = String(v); }); }
function button($w, sel, label, href) {
  set($w, sel, el => {
    if (label) el.label = String(label);
    if (href) { el.link = String(href); el.target = href.startsWith("http") ? "_blank" : "_self"; }
  });
}

export function renderPage($w, data) {
  if (!data) return;
  text($w, "#pageEyebrow", data.eyebrow);
  text($w, "#pageTitle", data.heroTitle || data.title);
  text($w, "#pageAccent", data.heroAccent);
  text($w, "#pageBody", data.heroBody || data.description);
  if (data.heroCta) button($w, "#heroCta", data.heroCta.label, data.heroCta.href);

  (data.sections || []).forEach((s, idx) => {
    const i = idx + 1;
    text($w, `#sec${i}Eyebrow`, s.eyebrow);
    text($w, `#sec${i}Title`, s.title);
    text($w, `#sec${i}Body`, s.body);
    const ctaLabel = s.ctaText || s.label;
    const ctaHref = s.ctaHref || s.href;
    if (ctaLabel || ctaHref) button($w, `#sec${i}Cta`, ctaLabel, ctaHref);
    (s.stats || []).forEach((st, j) => {
      text($w, `#sec${i}Stat${j + 1}Value`, st.value);
      text($w, `#sec${i}Stat${j + 1}Label`, st.label);
    });
    (s.steps || []).forEach((st, j) => {
      text($w, `#sec${i}Step${j + 1}N`, st.n);
      text($w, `#sec${i}Step${j + 1}Title`, st.title);
      text($w, `#sec${i}Step${j + 1}Body`, st.body);
    });
    (s.cards || []).forEach((c, j) => {
      text($w, `#sec${i}Card${j + 1}Title`, c.title);
      text($w, `#sec${i}Card${j + 1}Body`, c.body);
      if (c.href) button($w, `#sec${i}Card${j + 1}Btn`, c.meta || "Learn more", c.href);
    });
    (s.items || []).forEach((it, j) => {
      text($w, `#sec${i}Item${j + 1}Year`, it.year);
      text($w, `#sec${i}Item${j + 1}Title`, it.title);
      text($w, `#sec${i}Item${j + 1}Body`, it.body);
    });
  });
}
