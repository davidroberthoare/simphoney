# SimPhoney

A practical tool for filmmakers to simulate phone notifications, messaging and other common interactions on real devices during filming.

## About

SimPhoney is a hobby project and very much a work in progress. It was created to solve a common filmmaking problem: capturing realistic phone interactions on camera without relying on post-production overlays or screen replacements.

Instead of adding notifications in post or using fake phone mockups, SimPhoney lets you trigger realistic iOS/Android notifications and SMS conversations on an actual device in frame, giving you authentic reactions and timing during the shoot.

**This project is open source and completely free to use.**

## Features

### Notification Simulations

- Create custom push notifications with sender name, avatar, message text, and timestamp
- Choose between lockscreen or website background display
- Optional clock display for lockscreen mode
- Control timing with timed delays or remote triggers

### SMS Conversation Simulations

- Simulate multi-party SMS conversations
- Pre-filled messages that appear on load
- Sequential incoming messages with customizable delays
- Typing indicators for realistic message flow
- Auto-follow mode for rapid-fire message sequences

### Remote Control

- Trigger simulations from a separate remote control device/browser
- Auto-discovery of devices on the same network/channel
- Support for up to 5 simultaneous player devices
- Real-time connection status and device management
- Perfect for coordinating with crew during takes

### Customization

- iOS or Android styling
- Dark mode support
- Custom background images
- Configurable remote channels for multiple setups
- Player slot assignment (Player 1-5)

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

Simply open `index.html` in a web browser or host it on any web server. No build process or dependencies to install.

For best results, install as a Progressive Web App on your device for a full-screen, native-like experience.

## Current Status

⚠️ **Work in Progress** - This is an active hobby project. Expect bugs, missing features, and breaking changes.

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

Open source and free to use for any purpose. No warranty provided.

## Credits

- Created for filmmakers, by a film teacher, **[David Hoare](https://davidhoare.net)**.
- "Using phone" icons created by **[kornkun](https://www.flaticon.com/free-icons/using-phone)**
- Random users provided by **[randomuser.me](https://randomuser.me/api/?results=200&nat=us,dk,fr,gb&inc=gender,name,nat,phone,email,picture)**

:)
