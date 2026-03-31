# SimPhoney

A practical tool for filmmakers to simulate phone notifications, messaging and other common interactions on real devices during filming.

## About

SimPhoney is a hobby project and very much a work in progress. It was created to solve a common filmmaking problem: capturing realistic phone interactions on camera without relying on post-production overlays or screen replacements.

Instead of adding notifications in post or using fake phone mockups, SimPhoney lets you trigger realistic iOS/Android notifications and SMS conversations on an actual device in frame, giving you authentic reactions and timing during the shoot.

**This project is open source and completely free to use.**

## Features


### Notification Simulations

- Create custom push notifications with sender name, avatar, message text, and timestamp

### SMS Conversation Simulations

- Simulate multi-party SMS conversations
- Pre-filled messages that appear on load
- Sequential incoming messages with customizable delays
- Typing indicators for realistic message flow
- Auto-follow mode for rapid-fire message sequences

### Incoming Call Simulations

- Simulate realistic incoming phone calls with caller name and avatar
- Choose between timed delay or remote trigger
- Custom ringtone selection

### Outgoing Call Simulations

- Simulate placing an outgoing call with customizable contact

### Email Simulations

- Simulate receiving email notifications
- Can reply, forward, delete, and compose new emails
- Simulated sending action
- Fully 'functional' inbox, with prepopulated random, or customized emails
- Custom sender name, subject line, and preview text
- Timed or remote-triggered delivery

### Remote Control

- Trigger simulations from a separate remote control device/browser
- Auto-discovery of devices on the same network/channel
- Support for up to 5 simultaneous player devices
- Configurable remote channels for multiple setups
- Real-time connection status and device management
- Perfect for coordinating with crew during takes

### Customization

- Control timing with timed delays or remote triggers
- Choose between lockscreen or website background display, or 'blank'
- Custom backgrounds (images, websites, or blank)
- Selectable notification sounds
- Custom avatars and text content on all features
- iOS or Android styling
- Dark mode support

## How It Works

1. **Create a Simulation** - Set up notification or SMS conversations with your desired content
2. **Choose Trigger Type**:
   - **Timed**: Automatically triggers after a specified delay
   - **Remote**: Waits for trigger from remote control device
3. **Play the Simulation** - Device displays the notification/conversation just like a real phone
4. **Remote Control** (optional) - Use a second device to trigger the simulation on cue

## Use Cases

- Film scenes where a character receives a text or notification
- Capture genuine reactions to phone interactions
- Control timing precisely during takes
- Multiple devices for scenes with multiple characters
- Background phone activity in wide shots

## Technology

Built with:

- Framework7 v9+ (mobile-first UI framework)
- Vanilla JavaScript (no frameworks)
- Vanilla CSS (no preprocessors)
- PeerJS (for remote control functionality)
- Progressive Web App (installable, works offline)

## Installation

Simply open [https://simphoney.drhmedia.net/](https://simphoney.drhmedia.net/) in a mobile browser (and again on another device if you wanat to remote control the first one). If you'd like to host it on your own web server, you can clone the repo or download the zip archive straight to the web root. No build process or dependencies to install.

For best results, install as a Progressive Web App on your device for a full-screen, native-like experience.

## Current Status

⚠️ **Work in Progress** - This is an active hobby project. Expect bugs, missing features, and breaking changes. I will attempt to keep the 'live' branch (hosted at https://simphoney.drhmedia.net/) fully working at all times. It's possible you might have to clear your cache and reset the data (there is a built-in function on the global settings page for that).

### Working

- Notification simulations (timed and remote)
- SMS conversation simulations (timed and remote)
- Remote control with auto-discovery
- Global settings and customization
- PWA installation
- iOS/Android styling
- Phone call simulations
- Sound effects

### Planned
- Additional notification types
- More messaging apps (WhatsApp, iMessage, etc.)
- Better error handling
- Documentation improvements

## Contributing
This is a personal hobby project, but contributions, suggestions, and bug reports are welcome! Feel free to open issues or submit pull requests.

If you find this app useful, especially if you use it in a project, please let us know in the [discussions](https://github.com/davidroberthoare/simphoney/discussions/categories/show-and-tell), or you can sponsor the project here: [https://github.com/sponsors/davidroberthoare](https://github.com/sponsors/davidroberthoare) or here: [https://ko-fi.com/davidhoare](https://ko-fi.com/davidhoare).

## Privacy
No personal data is collected or shared at any time. All customizations you make (data and images) are stored in your local browser, and never sent to any server.

I have included [Umami](https://umami.is/) analytics calls at the top of the index.html page and during navigation events in home.html, just so I can see if anyone's using the app, but feel free to remove it if you host your own version. Analytics can also be simply disabled in-app on first load, or via the global settings page.

## License
See LICENSE file for Creative Commons details. 

## Credits
- Created for filmmakers, by a film teacher, **[David Hoare](https://davidhoare.net)**.
- "Using phone" icons created by **[kornkun](https://www.flaticon.com/free-icons/using-phone)**
- Random users provided by **[randomuser.me](https://randomuser.me/api/?results=200&nat=us,dk,fr,gb&inc=gender,name,nat,phone,email,picture)**

:)
