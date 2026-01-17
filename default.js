// only used for first loads and resets
const defaultAppData = {
    global: {
        dark_mode: false,
        os: 'ios',
        background_img: 'img/bg_default.jpg',
    },
    sims: {
        s_1: {
            id: 's_1',
            type: 'notification',
            name: 'Sample Notification',
            delay: 1,
            trigger_type: 'timed',
            sent_time: 'now',
            sender_name: 'Sender Name',
            sender_image: generateRandomAvatar(),
            message: 'This is an example notification message.',
        },
        s_2: {
            id: 's_2',
            type: 'notification',
            name: 'Another Notice',
            delay: 3,
            trigger_type: 'timed',
            sent_time: '12:30pm',
            sender_name: 'Your Friend',
            sender_image: generateRandomAvatar(),
            message: 'Here is the message.',
        },
        s_3: {
            id: 's_3',
            type: 'sms',
            name: 'Sample SMS',
            delay: 5,
            trigger_type: 'timed',
            start_date: '2024-01-01 10:00 AM',
            senders: [
                { name: 'Bob Bobson', image: generateRandomAvatar(1) },
                { name: 'Sally Sallyson', image: generateRandomAvatar(2) },
            ],
            prefilled: [
                //already on the page when it loads
                { from: 0, text: 'Hey, how are you?', delay: 0 },
                { from: 'me', text: 'I am good, thanks! How about you?', delay: 2 },
                { from: 1, text: 'We\'re all doing well, and just wanted to check in.', delay: 4 },
            ],
            messages: [
                //to be added during the simulation
                { from: 0, text: 'When are you coming home?', autofollow: true, delay: 1 },
                { from: 1, text: 'Are you sure?', autofollow: false, delay: 1 },
                { from: 1, text: 'Tell me more about that...', autofollow: true, delay: 1 },
                { from: 0, text: 'No way ;)', autofollow: true, delay: 1 },
            ],
        }
    },
};