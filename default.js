// only used for first loads and resets
const defaultAppData = {
    global: {
        dark_mode: false,
        os: 'ios',
        background_img: 'img/bg_default.jpg',
        remote_channel: 'default',
        player_slot: 'player1',
        alert_sound: 'alert_1',
        ringtone_sound: 'ringtone_1',
    },
    sims: {
        s_1: {
            id: "s_1",
            type: "notification",
            name: "Sample Notification",
            delay: "1",
            trigger_type: "timed",
            sent_time: "now",
            sender: generateContacts(1)[0],
            message: "This is an example notification message.",
            clock_time: "12:34pm",
            background_type: "lockscreen",
            website_url: "",
            sound_enabled: true,
            vibration_enabled: true
        },
        s_2: {
            id: 's_2',
            type: 'sms',
            name: 'Sample SMS',
            trigger_type: 'timed',
            sound_enabled: true,
            vibration_enabled: true,
            senders: generateContacts(2),
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
        },
        s_3: {
            id: 's_3',
            type: 'call_in',
            name: 'Sample Incoming Call',
            trigger_type: 'timed',
            delay: 2,
            caller: generateContacts(1)[0],
            clock_time: '12:34pm',
            background_type: 'lockscreen',
            website_url: '',
            custom_ringtone: ''
        },
        s_4: {
            id: 's_4',
            type: 'call_out',
            name: 'Sample Outgoing Call',
            trigger_type: 'timed',
            delay: 2,
            contacts: generateContacts(20),
            recents: [
                { contactId: 2, type: 'outgoing', duration: '2:34', timestamp: '10:23am' },
                { contactId: 1, type: 'incoming', duration: '1:12', timestamp: '9:45am' },
                { contactId: 6, type: 'outgoing', duration: '5:21', timestamp: 'Yesterday' },
                { contactId: 4, type: 'incoming', duration: '0:43', timestamp: 'Yesterday' },
                { contactId: 2, type: 'outgoing', duration: '3:18', timestamp: 'Monday' }
            ],
            selected_contact_id: null,
            clock_time: '12:34pm',
        },
        s_5: {
            id: 's_5',
            type: 'email',
            name: 'Sample Email',
            trigger_type: 'timed',
            delay: 3,
            sound_enabled: true,
            vibration_enabled: true,
            start_mode: 'notification',
            clock_time: '12:34pm',
            background_type: 'lockscreen',
            website_url: '',
            featured_email: {
                sender_name: generateContacts(1)[0].fullname,
                sender_email: generateContacts(1)[0].email,
                sender_avatar: generateContacts(1)[0].picture.medium,
                subject: 'Important Update',
                sent_time: '10:23 AM',
                body: 'Hi there,\n\nThis is an important update regarding your account. We wanted to inform you about some recent changes that may affect your experience.\n\nPlease review the following details carefully:\n\n1. Your account settings have been updated\n2. New features are now available\n3. Security enhancements have been implemented\n\nIf you have any questions or concerns, please don\'t hesitate to reach out to our support team.\n\nBest regards,\nThe Support Team'
            },
            inbox_emails: [
                {
                    sender_name: generateContacts(1)[0].fullname,
                    sender_email: generateContacts(1)[0].email,
                    sender_avatar: generateContacts(1)[0].picture.medium,
                    subject: 'RE: Project Update',
                    sent_time: 'Yesterday',
                    body: 'Thanks for the update. I reviewed the documents and everything looks good.\n\nLet me know when you\'re ready to proceed with the next phase.\n\nBest,\nJohn',
                    read: true
                },
                {
                    sender_name: generateContacts(1)[0].fullname,
                    sender_email: generateContacts(1)[0].email,
                    sender_avatar: generateContacts(1)[0].picture.medium,
                    subject: 'Meeting Notes',
                    sent_time: 'Monday',
                    body: 'Here are the notes from yesterday\'s meeting:\n\n- Discussed Q1 goals\n- Reviewed budget allocations\n- Assigned action items\n\nPlease review and let me know if I missed anything.',
                    read: true
                }
            ],
            use_random_inbox: true
        }
    },
};