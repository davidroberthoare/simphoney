
// UTILITY FUNCTIONS -------------------------------------
// UTILITY FUNCTIONS -------------------------------------
// UTILITY FUNCTIONS -------------------------------------

// Reset app: clear all data, cache, and service worker
async function resetApp() {
  try {
    // Show confirmation dialog
    const confirmed = await new Promise((resolve) => {
      app.dialog.confirm(
        'This will reset all data, clear cache, and reload the app. Are you sure?',
        'Reset App',
        () => resolve(true),
        () => resolve(false)
      );
    });

    if (!confirmed) {
      return;
    }

    console.log('[Reset] Starting app reset...');

    // 1. Clear localStorage
    console.log('[Reset] Clearing localStorage...');
    localStorage.clear();

    // 2. Clear sessionStorage
    console.log('[Reset] Clearing sessionStorage...');
    sessionStorage.clear();

    // 3. Clear all caches
    if ('caches' in window) {
      console.log('[Reset] Clearing all caches...');
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => {
          console.log('[Reset] Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }

    // 4. Unregister all service workers
    if ('serviceWorker' in navigator) {
      console.log('[Reset] Unregistering service workers...');
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map(registration => {
          console.log('[Reset] Unregistering:', registration.scope);
          return registration.unregister();
        })
      );
    }

    // 5. Clear IndexedDB if used (future-proofing)
    if ('indexedDB' in window) {
      console.log('[Reset] Clearing IndexedDB...');
      const dbs = await indexedDB.databases();
      dbs.forEach(db => {
        if (db.name) {
          indexedDB.deleteDatabase(db.name);
        }
      });
    }

    console.log('[Reset] Reset complete, reloading...');

    // 6. Reload the page with cache bypass
    window.location.reload(true);
  } catch (error) {
    console.error('[Reset] Error during reset:', error);
    app.dialog.alert('An error occurred during reset. Please try manually clearing your browser cache.', 'Reset Error');
  }
}

// Generate a unique ID
function generateUniqueId() {
    return 'sim-' + Math.random().toString(36).slice(2, 16);
}

// generate random placeholder avatars  
function generateRandomAvatar(id) {
    // If random users data is available, use a random thumbnail from it
    let index;
    if (typeof id !== 'undefined' && id !== null) {
        // Use the id as a seed for consistent results for the same id
        index = id % randomUsersData.length;
    } else {
        // Otherwise, pick a truly random user
        index = Math.floor(Math.random() * randomUsersData.length);
    }
    const user = randomUsersData[index];
    return user.picture.medium;

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

// Generate random contacts from randomUsersData
function generateContacts(count) {
    const contacts = [];
    const maxCount = Math.min(count, randomUsersData.length);

    // Shuffle indices to ensure variety and no duplicates
    const availableIndices = [...Array(randomUsersData.length).keys()];
    for (let i = availableIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
    }

    // Pluck the requested number of users (up to the total available)
    for (let i = 0; i < maxCount; i++) {
        const userIndex = availableIndices[i];
        const user = randomUsersData[userIndex];

        // Add the entire user object with an id, favorite flag, and fullname for convenience
        contacts.push({
            ...user,
            id: i + 1,
            favorite: Math.random() < 0.2, // 20% chance of being a favorite
            fullname: `${user.name.first} ${user.name.last}`
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
