# John Jerald AI Video Portfolio — V5

Full replacement version for the existing Vercel/GitHub portfolio.

## V5 updates
- Added circular profile portrait in the hero section.
- Main intro headline now emphasizes 100M+ views generated across different platforms.
- Preserves verified Facebook/YouTube analytics section.
- Preserves section-by-section video categories: VSL, UGC, Pixar Style, Animation, Other AI Content.
- Preserves inline Google Drive video players with muted-autoplay request.
- Preserves light/dark mode and motion interactions.

## Deploy
Replace the existing repository contents with this folder, commit to `main`, and Vercel should redeploy automatically.

Make sure all Google Drive videos remain set to **Anyone with the link → Viewer**.


## V6 updates
- Contact buttons: Email, WhatsApp, Telegram
- Contact details shown directly in the contact section
- All Google Drive embeds request autoplay + muted playback by default (`autoplay=1&mute=1`). Browser/Google Drive policies may still require user interaction.


## V7 video behavior
Video cards use native HTML5 `<video>` elements with `autoplay`, `muted`, `loop`, and `playsInline`. This keeps autoplay silent by default. Google Drive can occasionally block direct delivery for some files; when that happens the card shows a silent fallback instead of starting audio.
