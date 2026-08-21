// WCAG 2.1 contrast checker for CCD design tokens.
const T = {
  gold:'#fec630', goldDark:'#e6ac00', green:'#209765', greenDeep:'#124a34',
  blue:'#0797d4', slate:'#37474f', ink:'#1a1a1a', muted:'#5b6b72',
  soft:'#eef1f2', offwhite:'#f5f7f8', white:'#ffffff',
};
const lum = h => {
  const [r,g,b] = [1,3,5].map(i => parseInt(h.slice(i,i+2),16)/255)
    .map(c => c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4));
  return 0.2126*r + 0.7152*g + 0.0722*b;
};
const ratio = (a,b) => { const [x,y]=[lum(a),lum(b)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05); };

// [fg, bg, label, isLargeText]  large = >=18.66px bold or >=24px
const PAIRS = [
  ['ink','gold','.ccd-btn-gold  dark text on gold button',false],
  ['white','gold','white text on gold (if ever used)',false],
  ['gold','white','gold text/icon on white',false],
  ['goldDark','white','gold-dark text on white',false],
  ['gold','greenDeep','.ccd-utility-text hover / gold on green band',false],
  ['white','greenDeep','.ccd-utility-text 12px caps white on green band',false],
  ['white','green','white on mid green',false],
  ['gold','ink','.ccd-footer-text gold link hover on footer',false],
  ['offwhite','ink','.ccd-footer-text 14px off-white on footer',false],
  ['muted','ink','.ccd-footer-muted 12px muted on #1A1A1A footer',false],
  ['muted','white','muted body text on white',false],
  ['greenDeep','white','.ccd-eyebrow 12px caps green on white',false],
  ['green','white','mid green text on white',false],
  ['blue','white','blue link on white',false],
  ['slate','white','slate body on white',false],
  ['ink','white','.ccd-h-ovo ink heading on white',false],
  ['ink','soft','ink on soft grey panel',false],
  ['ink','offwhite','ink on off-white panel',false],
  ['white','ink','.ccd-h-ovo-white on footer/dark',false],
  ['white','slate','white on slate',false],
  ['white','blue','white on blue',false],
];
let fails = 0;
console.log('fg/bg'.padEnd(22) + 'ratio  AA    AAA   what');
for (const [f,b,label,large] of PAIRS) {
  const r = ratio(T[f],T[b]);
  const aa = large ? 3 : 4.5, aaa = large ? 4.5 : 7;
  const ok = r >= aa;
  if (!ok) fails++;
  console.log(
    `${f}/${b}`.padEnd(22) +
    r.toFixed(2).padStart(5) + '  ' +
    (ok ? 'PASS' : 'FAIL').padEnd(6) +
    (r >= aaa ? 'PASS' : 'fail').padEnd(6) +
    label
  );
}
console.log(`\n${fails} AA failure(s) of ${PAIRS.length} pairs in the CURRENT tokens (see ACCESSIBILITY.md section 2).`);

// ---- Regression guard: the prescribed fixes must pass. Exits non-zero if one is reverted. ----
const FIXES = [
  ['#77848a','#1a1a1a',4.5,'--ccd-muted-on-dark (NEW) on footer ink'],
  ['#5b6b72','#ffffff',4.5,'--ccd-muted kept as-is on white'],
  ['#124a34','#ffffff',3.0,'nav hover underline green-deep on white (UI 3:1)'],
  ['#067db0','#ffffff',4.5,'blue link darkened'],
  ['#124a34','#ffffff',4.5,'green text uses green-deep, not mid-green'],
  ['#1a1a1a','#fec630',4.5,'.ccd-btn-gold ink-on-gold stays the only gold pairing'],
  ['#ffffff','#1c865a',4.5,'darkened green band, if body-size white text must sit on it'],
  ['#fec630','#124a34',3.0,'gold focus ring on the green band (UI 3:1)'],
  ['#fec630','#1a1a1a',3.0,'gold focus ring on the footer (UI 3:1)'],
  ['#124a34','#ffffff',3.0,'green-deep focus ring on white (UI 3:1)'],
];
console.log('\nRegression guard — prescribed fixes:');
let broken = 0;
for (const [f,b,min,label] of FIXES) {
  const r = ratio(f,b), ok = r >= min;
  if (!ok) broken++;
  console.log(`  ${ok ? 'ok  ' : 'BROKEN'} ${f} on ${b}  ${r.toFixed(2)} (needs ${min})  ${label}`);
}

// One grey cannot serve both white and ink at 4.5:1 — this is why two muted tokens exist.
// If someone consolidates them back into one, this assert is the thing that complains.
const bothOk = c => ratio(c,'#ffffff') >= 4.5 && ratio(c,'#1a1a1a') >= 4.5;
console.assert(!bothOk('#5b6b72') && !bothOk('#77848a'),
  'a single muted token now passes on both backgrounds — re-check whether two tokens are still needed');

// self-check against known reference values
console.assert(Math.abs(ratio('#ffffff','#000000') - 21) < 0.01, 'white/black must be 21:1');
console.assert(Math.abs(ratio('#767676','#ffffff') - 4.54) < 0.02, '#767676 on white must be ~4.54:1');
console.log(broken ? `\n${broken} prescribed fix(es) BROKEN.` : '\nAll prescribed fixes hold. Self-check ok.');
process.exitCode = broken ? 1 : 0;
