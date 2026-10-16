# TG Cloud 240 — Telegram Web K for feature phones

This repository publishes a small-screen launcher by default and can build a **real Telegram Web K client** for the itel Neo R60+ (240×320) when the owner provides their own Telegram API application credentials as GitHub Actions secrets.

- Real client source: https://github.com/TelegramOrg/Telegram-web-k
- Official Telegram Web K: https://web.telegram.org/k/
- Telegram API setup: https://my.telegram.org
- Telegram Web K upstream license: GPL-3.0-only. The workflow clones the upstream source at build time. Keep the upstream license and copyright notices and comply with GPL-3.0 when distributing modified builds.
- TG Cloud 240 is an unofficial community adaptation and is not endorsed by Telegram.

## What's deployed right now

Until both `TELEGRAM_API_ID` and `TELEGRAM_API_HASH` are configured in GitHub Actions secrets, the Pages workflow publishes `index.html`, a small keypad-friendly launcher that opens the official Telegram Web K or Web A client. It does **not** simulate chats, collect login details, or claim that a fake chat list is live Telegram.

After the secrets are configured, every push to `main` builds the actual upstream Telegram Web K source, applies the TeleLite stylesheet, and publishes the real client instead.

## Enable the real custom client

1. Open https://my.telegram.org and sign in to **API development tools**. Register an application and obtain an `api_id` and `api_hash`.
2. In this GitHub repository open **Settings → Secrets and variables → Actions**.
3. Create repository secrets named exactly:
   - `TELEGRAM_API_ID`
   - `TELEGRAM_API_HASH`
4. Open **Actions → Publish TG Cloud 240** and choose **Run workflow**, or push a commit to `main`.
5. Open the workflow run and check that the job succeeds. The published URL is shown in the `github-pages` environment.

The workflow passes these build-time variables to Telegram Web K as `VITE_API_ID` and `VITE_API_HASH`. A browser client must deliver its API configuration to the browser as part of the bundle; these values are not the same as your Telegram account login. Do not put your phone number, one-time login code, two-step verification password, or session data into GitHub.

## Add to CloudPhone

The project Pages URL is:

`https://nrjsowefterbd.github.io/tg-cloud240/?a11y=1`

Add this URL as your CloudPhone widget. After the actual client build succeeds, login on that hosted domain. Browser storage is separate from `web.telegram.org`, so the official site's session will not automatically transfer.

The `?a11y=1` query asks Telegram Web K to enable its keyboard/screen-reader accessibility layer. The theme adds visible keyboard focus and smaller-screen styling. Physical OK, Back, and directional key events depend on the CloudPhone browser runtime; test them on the device.

## Notes

- GitHub Pages is static HTTPS hosting. It does not run a server or hide credentials that a browser client must use.
- The workflow tracks the upstream default branch at build time. If upstream changes its package requirements or source layout, the build may need an update.
- This project has not yet been validated on the physical itel Neo R60+; the 240×320 layout is an adaptation target, not a guarantee that every advanced Telegram feature will work on the device.


## YouTube Cloud 240

Open the real YouTube mini-app at:

`https://nrjsowefterbd.github.io/tg-cloud240/youtube.html`

Features:
- Responsive 240×320 screen layout.
- Real YouTube video playback through YouTube's supported embedded player.
- Real YouTube search in the browser without an API key.
- Optional in-app search using the YouTube Data API v3.
- Smooth mouse pointer on devices that report a fine pointer, plus keypad arrow/OK navigation.
- No sample or fake search results.

### Enable in-app YouTube search (optional)

1. In Google Cloud Console, create/select a project and enable **YouTube Data API v3**.
2. Create an API key and restrict it to **YouTube Data API v3** and the HTTP referrer `https://nrjsowefterbd.github.io/*`.
3. Open the YouTube app, expand **Optional in-app search setup**, enter your key, and save it on that device.
4. Run a search. The app requests real video results from `youtube.googleapis.com` and allows selecting a result for embedded playback.

The API key is stored in that device's browser storage and is visible to the browser, so referrer and API restrictions are important. Keep the key out of public source files. YouTube API quotas and terms apply. If no key is saved, the app opens real YouTube mobile search instead.

YouTube's embedded player has platform and video-specific restrictions. If an uploader disables embedding or the feature-phone browser cannot play a video, select **Open on YouTube** or use the normal YouTube website. This page is an unofficial launcher/client and is not endorsed by YouTube.
