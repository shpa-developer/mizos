# Mizos — Production Readiness Checklist

## Done

- [x] App icon & splash with custom branding
- [x] Bundle IDs (iOS `in.mizos.app` + Android)
- [x] EAS build config (dev/preview/production)
- [x] Deep link scheme (`mizos://`)
- [x] i18n (7 languages: en, hi, pa, mr, bn, kn, gu)
- [x] Error boundary
- [x] Version display from expo-constants
- [x] Web import page (`web/import.html` exists)
- [x] TypeScript compiles clean

## Blockers (must fix before store submission)

- [ ] **Privacy policy URL** — Both stores require one. Need a hosted page and enter URL in App Store Connect / Play Console.
- [ ] **`ios.buildNumber` + `android.versionCode`** — Missing from app.json. Stores reject uploads without these.
- [ ] **Deploy web import page** — `web/import.html` exists but needs hosting (GitHub Pages, Vercel, etc.) for share links to work.
- [ ] **Apple Developer ($99/yr) + Google Play ($25)** — Accounts needed, then run `eas build` and `eas submit`.

## High Priority (should fix before launch)

- [ ] **Delete All Data** option in settings — Stores may ask about data deletion during review.
- [ ] **Data export/backup** — Users can't migrate or back up measurements.
- [ ] **Store metadata** — App description, screenshots (multiple device sizes), keywords, category, age rating.
- [ ] **Add `expo-dev-client`** — Referenced in eas.json dev profile but not installed.

## Nice-to-Have (v1.1)

- [ ] **Dark mode** — Currently hardcoded light only.
- [ ] **App review prompt** — `expo-store-review` integration.
- [ ] **Analytics / crash reporting** — Monitor production health.
- [ ] **OTA updates** — `expo-updates` for post-launch fixes without store review.
