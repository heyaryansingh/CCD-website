# The editor's configuration

`/admin` is [Sveltia CMS](https://sveltiacms.app). Its configuration used to be
one 1,050-line `config.yml`; it is now one file per sidebar section.

```
admin/
  index.html              lists the files below, in sidebar order
  config.yml              backend, media folder, commit messages — nothing else
  collections/
    pages.yml             every page, and the blocks a page is built from
    projects.yml          project detail pages
    news-events.yml       articles and events
    people.yml            staff, interns, who-to-contact
    partners.yml          partners, supporter logos, quotes
    programs.yml          membership tiers, Clean & Green services
    brew.yml              The 4th Brew's coffees and brewing guide
    photos.yml            slideshow, before/after pairs, map pins
    translations.yml      the language dictionaries
    settings.yml          contact details, menus, payment links
```

Sveltia loads every file listed in `index.html` and merges them in order, so
each file is a standalone `collections:` list holding one section. **Splitting
them means a change to one section cannot syntax-error another** — a stray
indent in `brew.yml` takes out the coffee screens and leaves Pages working.

## Adding a section to the sidebar

1. Write `collections/<name>.yml`. Start it with `collections:` and one entry.
2. Add a `<link rel="cms-config-url" href="/admin/collections/<name>.yml" …>` tag
   to `index.html`, in the position you want it to appear in the sidebar.

That is the whole change. Nothing else references the new file.

## Adding a field to something that already exists

Edit that one file. If the field holds content the site renders, also add it to
the matching type in `ccd-website/lib/types.ts`, or TypeScript will not know it
exists.

## Adding a new kind of page block

Four places, in this order — miss one and the block either cannot be created or
cannot be drawn:

1. `lib/types.ts` — add it to the `Section` union.
2. `components/PageView.tsx` — add a `case` to `RenderSection()`.
3. `collections/pages.yml` — add it under `sections:` → `types:`, so it appears
   in the editor's **Add** menu.
4. `app/globals.css` — style it.

## Things that are easy to get wrong

- **Paths are relative to the repository root**, not to `ccd-website/`. That is
  why every `file:` and `folder:` starts with `ccd-website/`.
- **YAML anchors do not work across files.** Anything shared has to be repeated,
  or moved into the same file.
- `icon:` uses [Material Symbols](https://fonts.google.com/icons) names.
  `- divider: true` draws a separator. Neither touches saved content.
- Adding a language to `translations.yml` is not enough on its own — see the
  comment at the top of that file.
