function updateNotificationSettings() {
    $settings = $$('form.list.settings');
    try {
        if (appData.currentSim) {

            appData.currentSim.name = $settings.find('input[name="name"]').val();
            appData.currentSim.sender_name = $settings.find('input[name="sender_name"]').val();
            appData.currentSim.message = $settings.find('input[name="message"]').val();
            appData.currentSim.sent_time = $settings.find('input[name="sent_time"]').val();
            appData.currentSim.trigger_type = $settings.find('select[name="trigger_type"]').val();
            appData.currentSim.delay = $settings.find('input[name="delay"]').val();
            console.log('Notification settings updated:', appData.currentSim);
            appData.sims[appData.currentSim.id] = appData.currentSim;   //save it to the proper object
            saveAppData();
        }
    } catch (error) {
        console.log("Error updating notification settings:", error);
    }

}


function playThisSim() {
    updateNotificationSettings(); //ensure settings are saved before playing
    playSim(appData.currentSim.id);
}

function deleteThisSim() {
    const simId = appData.currentSim.id;
    if (confirm('Are you sure you want to delete this simulation? This action cannot be undone.')) {
        delete appData.sims[simId];
        appData.currentSim = null;
        saveAppData();
        console.log('Simulation deleted:', simId);
        navigateTo('/');
    }
}

// Handle sender image upload
function setupSenderImageUpload() {
    const fileInput = $$('#sender_image_upload');
    const previewImg = $$('#sender_image_preview');

    // Load existing image from appData if it exists
    if (appData.currentSim.sender_image && appData.currentSim.sender_image.startsWith('data:')) {
        previewImg.attr('src', appData.currentSim.sender_image);
    }

    // Handle file input change
    fileInput.on('change', function (e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            imageFileToBase64(file)
                .then((base64Data) => {
                    previewImg.attr('src', base64Data);
                    appData.currentSim.sender_image = base64Data;
                    console.log('Background image uploaded and stored successfully');
                })
                .catch((error) => {
                    app.notification.create({
                        title: 'Error',
                        text: 'Failed to upload image',
                        closeTimeout: 2000,
                        closeOnClick: true,
                    }).open();
                    console.error('Error uploading image:', error);
                });
        } else {
            app.notification.create({
                title: 'Invalid File',
                text: 'Please select a valid image file',
                closeTimeout: 2000,
                closeOnClick: true,
            }).open();
        }
    });

    // Handle clear button
    previewImg.on('click', function (e) {
        fileInput.val('');
        appData.currentSim.sender_image = generateRandomAvatar();
        previewImg.attr('src', appData.currentSim.sender_image);
        console.log('image reset');
    });
}



// LISTENERS FOR PAGE EVENTS --------------------------------------------
// LISTENERS FOR PAGE EVENTS ----------------------------
// LISTENERS FOR PAGE EVENTS ----------------------------

$$(document).on('page:init', '.page[data-name="notification_edit"]', function (e, page) {
    setupSenderImageUpload();
});


$$(document).on('page:beforein', '.page[data-name="notification_edit"]', function (e, page) {
    console.log('notification edit page displayed...', appData.currentSim);

    $settings = $$('form.list.settings');
    $settings.find('input[name="name"]').val(appData.currentSim.name);
    $settings.find('input[name="sender_name"]').val(appData.currentSim.sender_name);
    $settings.find('input[name="message"]').val(appData.currentSim.message);
    $settings.find('input[name="sent_time"]').val(appData.currentSim.sent_time);
    $settings.find('input[name="delay"]').val(appData.currentSim.delay);
    $settings.find('select[name="trigger_type"]').val(appData.currentSim.trigger_type);

});

$$(document).on('page:beforeout', '.page[data-name="notification_edit"]', function (e, page) {
    updateNotificationSettings();
});