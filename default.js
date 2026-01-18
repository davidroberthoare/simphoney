// only used for first loads and resets
const defaultAppData = {
    global: {
        dark_mode: false,
        os: 'ios',
        background_img: 'img/bg_default.jpg',
        remote_channel: 'default',
        player_slot: 'player1',
    },
    sims: {
        s_1: {
            id: "s_1",
            type: "notification",
            name: "Sample Notification",
            delay: "1",
            trigger_type: "timed",
            sent_time: "now",
            sender_name: "Sender Name",
            sender_avatar: "https://testingbot.com/free-online-tools/random-avatar/150?u=1768663665999",
            message: "This is an example notification message.",
            clock_time: "12:34pm",
            background_type: "lockscreen",
            website_url: ""
        },
        s_2: {
            id: 's_2',
            type: 'notification',
            name: 'Another Notice',
            delay: 3,
            trigger_type: 'timed',
            sent_time: '12:30pm',
            sender_name: 'Your Friend',
            sender_avatar: generateRandomAvatar(),
            message: 'Here is the message.',
            clock_time: "",
            background_type: "website",
            website_url: "https://davidhoare.net"
        },
        s_3: {
            id: 's_3',
            type: 'sms',
            name: 'Sample SMS',
            trigger_type: 'timed',
            senders: [
                { name: 'Bob Bobson', avatar: generateRandomAvatar(1) },
                { name: 'Sally Sallyson', avatar: generateRandomAvatar(2) },
            ],
            prefilled: [
                //already on the page when it loads
                { from: 0, text: 'Hey, how are you?', time: "10:15pm" },
                { from: 'me', text: 'I am good, thanks! How about you?', time: "10:17pm" },
                { from: 1, text: 'We\'re all doing well, and just wanted to check in.', time: "10:19pm" },
            ],
            messages: [
                //to be added during the simulation
                { from: 0, text: 'When are you coming home?', autofollow: false, delay: 2 },
                { from: 1, text: 'Are you sure?', autofollow: true, delay: 2 },
                { from: 1, text: 'Tell me more about that...', autofollow: false, delay: 2 },
                { from: 0, text: 'No way ;)', autofollow: false, delay: 3 },
            ],
        }
    },
};