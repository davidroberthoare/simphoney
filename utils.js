
// UTILITY FUNCTIONS -------------------------------------
// UTILITY FUNCTIONS -------------------------------------
// UTILITY FUNCTIONS -------------------------------------

// Generate a unique ID
function generateUniqueId() {
    return 'sim-' + Math.random().toString(36).slice(2, 16);
}

// generate random placeholder avatars  
function generateRandomAvatar(id) {
    if (typeof id === 'undefined' || id === null) {
        id = Date.now();
    }
    const avatar = 'https://testingbot.com/free-online-tools/random-avatar/150?u=' + id;
    return avatar;
}

// generate random placeholder avatars  
function generateRandomBackground(id) {
    if (typeof id === 'undefined' || id === null) {
        id = Date.now();
    }
    const bg = `https://picsum.photos/id/${id}/750/1334.jpg`;
    return bg;
}

// Generate random contacts with realistic names and phone numbers
function generateContacts(count) {
    const firstNames = [
        // English
        'Alice', 'Bob', 'Carol', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Iris', 'Jack', 
        'Karen', 'Leo', 'Maria', 'Nathan', 'Olivia', 'Paul', 'Quinn', 'Rachel', 'Steve', 'Tina',
        'Uma', 'Victor', 'Wendy', 'Xavier', 'Yara', 'Zack', 'Amy', 'Ben', 'Claire', 'Dan',
        'Ella', 'Fred', 'Gina', 'Hank', 'Ivy', 'Jane', 'Keith', 'Laura', 'Mark', 'Nina',
        // Spanish/Latin
        'Carlos', 'Sofia', 'Diego', 'Isabella', 'Miguel', 'Camila', 'Antonio', 'Valentina', 'Jose', 'Ana',
        'Luis', 'Elena', 'Fernando', 'Rosa', 'Pablo', 'Carmen', 'Ricardo', 'Gloria', 'Alejandro', 'Lucia',
        // Asian
        'Wei', 'Mei', 'Hiroshi', 'Yuki', 'Jun', 'Sakura', 'Raj', 'Priya', 'Arjun', 'Aisha',
        'Jin', 'Ling', 'Kenji', 'Hana', 'Ravi', 'Lakshmi', 'Amit', 'Sanjay', 'Haruto', 'Akiko',
        // African
        'Kwame', 'Amara', 'Kofi', 'Zuri', 'Jabari', 'Nia', 'Malik', 'Aaliyah', 'Tariq', 'Fatima',
        // Middle Eastern
        'Omar', 'Layla', 'Hassan', 'Nadia', 'Karim', 'Sara', 'Ali', 'Yasmin', 'Ahmed', 'Maryam',
        // European
        'Pierre', 'Sophie', 'Giovanni', 'Francesca', 'Klaus', 'Greta', 'Ivan', 'Natasha', 'Lars', 'Ingrid'
    ];
    
    const lastNames = [
        // English
        'Anderson', 'Bradley', 'Davis', 'Edwards', 'Foster', 'Harris', 'Jackson', 'Johnson',
        'King', 'Nelson', 'Parker', 'Robinson', 'Smith', 'Taylor', 'Turner', 'Walker', 'White', 'Wilson', 
        'Young', 'Allen', 'Baker', 'Clark', 'Green', 'Hill', 'Adams', 'Brown', 'Collins', 'Cooper', 'Evans',
        'Fisher', 'Gray', 'Hall', 'Hughes', 'James', 'Kelly', 'Lewis', 'Mitchell', 'Moore', 'Morgan',
        // Spanish/Latin
        'Garcia', 'Rodriguez', 'Martinez', 'Lopez', 'Gonzalez', 'Hernandez', 'Perez', 'Sanchez', 'Ramirez', 'Torres',
        'Flores', 'Rivera', 'Gomez', 'Diaz', 'Cruz', 'Morales', 'Reyes', 'Ortiz', 'Gutierrez', 'Jimenez',
        // Asian
        'Chen', 'Wang', 'Li', 'Zhang', 'Liu', 'Yang', 'Huang', 'Tanaka', 'Suzuki', 'Watanabe',
        'Sato', 'Yamamoto', 'Kumar', 'Singh', 'Patel', 'Sharma', 'Gupta', 'Khan', 'Kim', 'Park',
        // African
        'Okonkwo', 'Adeyemi', 'Mensah', 'Kamara', 'Ndlovu', 'Mwangi', 'Diallo', 'Otieno', 'Banda', 'Nkosi',
        // Middle Eastern
        'Al-Farsi', 'Hassan', 'Ibrahim', 'Mahmoud', 'Khalil', 'Said', 'Rashid', 'Abbas', 'Ismail', 'Mustafa',
        // European
        'Müller', 'Schmidt', 'Dubois', 'Bernard', 'Rossi', 'Bianchi', 'Ivanov', 'Petrov', 'Novak', 'Kovac'
    ];
    
    const contacts = [];
    const usedNames = new Set();
    const usedAvatarIds = new Set();
    
    // Shuffle arrays to ensure better distribution
    const shuffledFirstNames = firstNames.slice().sort(() => Math.random() - 0.5);
    const shuffledLastNames = lastNames.slice().sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < count; i++) {
        let name;
        let firstName, lastName;
        let attempts = 0;
        
        // Generate unique name
        do {
            firstName = shuffledFirstNames[i % shuffledFirstNames.length];
            lastName = shuffledLastNames[Math.floor((i + attempts) % shuffledLastNames.length)];
            name = `${firstName} ${lastName}`;
            attempts++;
        } while (usedNames.has(name) && attempts < 100);
        
        usedNames.add(name);
        
        // Generate unique avatar ID
        let avatarId;
        do {
            avatarId = Math.floor(Math.random() * 10000);
        } while (usedAvatarIds.has(avatarId));
        usedAvatarIds.add(avatarId);
        
        // Generate random phone number with realistic area code (not 555)
        const areaCodes = [201, 202, 203, 212, 213, 214, 215, 216, 217, 218, 310, 312, 313, 314, 315, 316, 401, 402, 404, 405, 
                          406, 407, 408, 410, 412, 415, 503, 504, 505, 507, 508, 509, 510, 512, 513, 515, 516, 517, 601, 602,
                          603, 605, 607, 608, 609, 610, 612, 614, 615, 617, 701, 702, 703, 704, 707, 708, 712, 713, 714, 717,
                          718, 719, 720, 801, 802, 803, 804, 805, 806, 808, 810, 813, 815, 816, 817, 818, 901, 904, 906, 907,
                          908, 909, 910, 912, 913, 914, 915, 916, 917, 918, 919, 920];
        
        const areaCode = areaCodes[Math.floor(Math.random() * areaCodes.length)];
        
        // Exchange starts with 1 (154, 187, 165, etc.)
        const exchange = 100 + Math.floor(Math.random() * 100); // 100-199
        const lineNumber = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const phoneNumber = `(${areaCode}) ${exchange}-${lineNumber}`;
        
        contacts.push({
            id: i + 1,
            name: name,
            number: phoneNumber,
            avatar: generateRandomAvatar(avatarId),
            favorite: Math.random() < 0.2 // 20% chance of being a favorite
        });
    }
    
    return contacts;
}


// IMAGE UPLOAD HANDLER ****************************
// IMAGE UPLOAD HANDLER ****************************
// IMAGE UPLOAD HANDLER ****************************

// Convert image to base64
function imageFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const base64Data = e.target.result;
                resolve(base64Data);
            } catch (error) {
                console.error('Error converting image to base64:', error);
                reject(error);
            }
        };
        reader.onerror = function () {
            reject(new Error('Error reading file'));
        };
        reader.readAsDataURL(file);
    });
}

// Resize and compress image to base64
async function resizeImageToBase64(file, maxWidth = 150, maxHeight = 150, quality = 0.7) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions maintaining aspect ratio
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to base64 with compression
                const base64Data = canvas.toDataURL('image/jpeg', quality);
                resolve(base64Data);
            };
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = e.target.result;
        };
        reader.onerror = () => reject(new Error('Error reading file'));
        reader.readAsDataURL(file);
    });
}


// SOUND AND VIBRATION UTILITIES **********************
// SOUND AND VIBRATION UTILITIES **********************
// SOUND AND VIBRATION UTILITIES **********************

// Sound cache for Howler instances
const soundCache = {};

// Preload a sound file
function preloadSound(soundPath, soundKey) {
    if (!soundCache[soundKey] && typeof Howl !== 'undefined') {
        soundCache[soundKey] = new Howl({
            src: [soundPath],
            preload: true,
            volume: 0.7
        });
    }
    return soundCache[soundKey];
}

// Play notification/alert sound
function playNotificationSound() {
    const alertSound = appData.global.alert_sound || 'alert1';
    const soundPath = `sounds/${alertSound}.mp3`;
    
    if (typeof Howl !== 'undefined') {
        const sound = soundCache[alertSound] || preloadSound(soundPath, alertSound);
        if (sound) {
            sound.play();
        }
    } else {
        // Fallback to basic Audio API
        const audio = new Audio(soundPath);
        audio.volume = 0.7;
        audio.play().catch(err => console.warn('Failed to play notification sound:', err));
    }
}

// Play SMS sound (uses same alert sounds as notifications)
function playSMSSound() {
    playNotificationSound();
}

// Play ringtone
function playRingtone() {
    const ringtone = appData.global.ringtone_sound || 'ringtone_1';
    const soundPath = `sounds/${ringtone}.mp3`;
    
    if (typeof Howl !== 'undefined') {
        const sound = soundCache[ringtone] || preloadSound(soundPath, ringtone);
        if (sound) {
            sound.loop(true);
            sound.play();
            return sound;
        }
    } else {
        // Fallback to basic Audio API
        const audio = new Audio(soundPath);
        audio.loop = true;
        audio.volume = 0.7;
        audio.play().catch(err => console.warn('Failed to play ringtone:', err));
        return audio;
    }
    return null;
}

// Stop a playing sound
function stopSound(sound) {
    if (sound) {
        if (sound.stop) {
            sound.stop();
        } else if (sound.pause) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
}

// Trigger vibration
function triggerVibration(pattern = [200, 100, 200]) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}
