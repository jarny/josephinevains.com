# josephinevains.com

A plain HTML/CSS/JS rebuild of the Webflow site, hosted on Netlify. No build step and no frameworks.

## Workflow

1. Make changes locally and preview them (see below).
2. Commit and push to GitHub.
3. Netlify publishes the new version automatically, usually within a minute.

Every published version is kept in Netlify's **Deploys** list, where an older version can be restored with one click.

## Preview locally

```powershell
python -m http.server 8081
```

Run this from this folder, then open http://localhost:8081. Use a local server rather than double-clicking the files, because the YouTube embed needs one. The contact form only works on the live Netlify site.

## Files

| Path | What it is |
| --- | --- |
| `index.html`, `about.html`, `teaching.html`, `events.html` | The main pages. Text is edited directly in the HTML. |
| `event.html?e=<slug>`, `project.html?p=<slug>` | Single event / project pages, filled in from `js/data.js`. |
| `404.html` | Shown by Netlify for addresses that don't exist. |
| `js/data.js` | **All events and projects.** Add or edit entries here. |
| `js/site.js` | Menu bar, contact footer, background shapes, and the code that draws the event/project cards. Phone number and YouTube link are in `CONFIG` at the top. |
| `css/style.css` | All styling. Colours are at the top as `--green`, `--pink`, `--gold`, `--cream`. |
| `images/`, `fonts/` | Images and the Calluna font files. |
| `netlify.toml` | Netlify settings (no build step; caching headers). |
| `_redirects` | Sends old Webflow addresses (`/about`, `/event/<slug>`, …) to the new pages. |

## Adding an event

Copy an existing entry in `js/data.js` and change it. `date` (YYYY-MM-DD) decides whether it appears under Upcoming or Past and the order. The home page shows up to six upcoming events. If there are none, it shows the three most recent. The **Book now** button only appears for upcoming events that have a `book` link.

## Contact form

The form uses **Netlify Forms**. Netlify finds it through the hidden `<form name="contact" data-netlify="true">` at the bottom of `index.html`. Keep its fields in step with the visible form in `js/site.js`. Messages appear in the Netlify dashboard under **Forms**. To get them by email: Netlify → Site configuration → Notifications → Emails and webhooks → Form submission notifications.

## One-time setup

1. **GitHub:** create a free account and an empty **private** repository (no README). Push this folder to it.
2. **Netlify:** create a free account, then *Add new project → Import an existing project → GitHub* and pick the repository. Leave the build command empty and the publish directory as `.` (`netlify.toml` already says this).
3. **Forms:** in the Netlify project, open **Forms** and enable form detection, then trigger a new deploy so Netlify picks up the contact form.
4. **Check the Netlify address** (`something.netlify.app`) thoroughly before touching the domain.
5. **Domain:** in Netlify, *Domain management → Add a domain* → `www.josephinevains.com` (set it as primary). Netlify shows the DNS records to use. At VentraIP, change **only** the records for `www` and the bare domain (`@`) from Webflow's to Netlify's. Leave MX, TXT and any email-related records untouched. Netlify issues the HTTPS certificate automatically once DNS points at it.
6. Once the live domain serves the new site correctly, cancel the Webflow site plan.

## Notes

- **Calluna font:** these are the font files that were uploaded to Webflow. Check that the licence covers self-hosting.
- Old past-event addresses: Webflow addresses are redirected to the new event page, but some older events now have different names in `js/data.js`, so those old links show a "not found" message rather than the event.
