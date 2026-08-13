---
description: Translate the next batch of CCD website strings into a language (no API key needed)
argument-hint: "<language code> [batch size]  e.g. /translate es 150"
allowed-tools: Bash(cd*), Bash(npm run i18n*), Read, Write
---

Translate the CCD website into `$1` (batch size: `$2`, default 150).

The site is written in English; every other language is a lookup table keyed by
the exact English string. You are the translator — there is no translation API
and no API key. Work in `C:\Aryan\GitHub Projects\CCD\ccd-website`.

1. `npm run i18n -- extract --locale=$1 --limit=${2:-150}`
   Writes `.i18n/todo.$1.json`. Read it. Interface text comes first on purpose.

2. Translate every string in `strings`. Write `.i18n/done.$1.json` as a flat
   `{"English source": "translation"}` object — the key must be the English
   string **character for character**, or it will not be found at render time.

   - Keep `{placeholders}` such as `{email}`, `{n}`, `{year}` exactly as they are.
   - Keep proper nouns: CCD, Cooperative Community Development, H.E.A.R.T.,
     Irvington, Baltimore, The 4th Brew, Clean & Green, HealthLink360, Oasis @ 240.
   - An ALL-CAPS label is a small eyebrow heading — match the register, using
     capitals only where the target script has them.
   - Prices, dates and street addresses stay as written.
   - This is a community-development non-profit writing for its neighbours: plain,
     warm, second person. Do not raise the reading level.

3. `npm run i18n -- apply --locale=$1`
   It rejects any key that matches no English on the site — if it reports
   ignored entries, fix those keys and re-apply rather than leaving them.

4. `npm run i18n -- report` and tell me the new coverage.

Do not edit `content/translations/*.json` by hand; `apply` owns those files.
