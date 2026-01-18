# SimPhoney

A practical tool for filmmakers to simulate phone notifications and SMS conversations on real devices during filming.

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

### Planned
- PWA installation
- iOS/Android styling
- Additional notification types
- Phone call simulations
- More messaging apps (WhatsApp, iMessage, etc.)
- Sound effects
- Better error handling
- Documentation improvements

## Contributing

This is a personal hobby project, but contributions, suggestions, and bug reports are welcome! Feel free to open issues or submit pull requests.

## License

Open source and free to use for any purpose. No warranty provided.

## Credits

Created for filmmakers, by a film teacher, David Hoare.

"Using phone" icons created by kornkun (https://www.flaticon.com/free-icons/using-phone)
