# Women Reclaiming AI — static preservation build

This is a **provisional static reconstruction** of the original custom WordPress website based on the surviving WordPress files and a screenshot from the Wayback Machine (January 2026).

The original theme's logo, styling, animated lettering, portrait images and 2019 project video are retained. The Dialogflow Messenger code is the code supplied by the project owner and uses the same agent ID as the original site.

## Known differences / remaining verification
- The original WordPress database was not supplied. Some text has been transcribed from a screenshot; all dates, collaborators and event destinations need checking against the archive.
- The historical event links were not recoverable from the screenshot, so event names are shown as non-clickable text, **not invented links**.
- The original list of collaborators was database-managed and could not be faithfully recovered, so a clearly identified placeholder replaces it.
- The portrait grid uses images from the original uploads, but their precise ordering and the original gridrotator motion are approximations.
- The project film and chatbot need testing after publication; the chatbot is hosted by Google and may depend on access/billing configuration.

## Publish on GitHub Pages
1. Create a PUBLIC GitHub repository, e.g. `women-reclaiming-ai` (free GitHub Pages supports public repos).
2. Upload all files and folders from this package to the repository root. Do not upload the outer directory alone.
3. Under Settings → Pages, select `Deploy from a branch`, `main`, `/ (root)` and Save.
4. Visit `https://YOUR-USERNAME.github.io/women-reclaiming-ai/` and test the video and Dialogflow Messenger.
5. To add a custom domain, configure Pages and DNS per GitHub's official instructions. Do not switch domain DNS until the site is verified.

## Local preview
Run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000/`. Dialogflow may require a deployed HTTPS URL to work fully.

## Privacy / permissions
Confirm consent and permissions for portrait use and hosting the project video. Review the accessibility, privacy notice and any tracking/third-party processing before launching.
