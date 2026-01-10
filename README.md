SimPhone — Offline phone simulator

Live site: https://projects.davidhoare.net/simphone/

Quick start

1. Serve the folder over HTTP (service workers require HTTPS or localhost):

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000/
```

2. Use the Setup view to create a notification (sender, message, optional icon). Click "Save Notification".
3. Click "Play Last" or press "Play" on a saved item to enter Playback mode. A phone will appear and the popup notification will show.
4. Tap the (visually hidden) top-left hotspot while in Playback to return to Setup.

Notes
- Notifications and uploaded images are stored in `localStorage` as data URLs.
- This is a minimal prototype. For larger images or many assets, switch to IndexedDB for storage.
