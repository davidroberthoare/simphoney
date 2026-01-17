
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

