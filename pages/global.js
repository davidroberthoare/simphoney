function populateGlobalSettings() {
  // Set background color selector
  $$('#global-background').val(appData.global.background);
}

// Handle background image upload
function setupBackgroundImageUpload() {
  const fileInput = $$('#background_img_upload');
  const previewContainer = $$('#background_img_preview_container');
  const previewImg = $$('#background_img_preview');
  const clearBtn = $$('#background_img_clear');

  // Load existing image from appData if it exists
  if (appData.global.background_img && appData.global.background_img.startsWith('data:')) {
    previewImg.attr('src', appData.global.background_img);
    previewContainer.css('display', 'block');
  }

  // Handle file input change
  fileInput.on('change', function (e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      imageFileToBase64(file)
        .then((base64Data) => {
          previewImg.attr('src', base64Data);
          previewContainer.css('display', 'block');
          appData.global.background_img = base64Data;
          saveAppData();
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
  clearBtn.on('click', function (e) {
    e.preventDefault();
    fileInput.val('');
    previewContainer.css('display', 'none');
    appData.global.background_img = generateRandomBackground();
    saveAppData();
    console.log('Background image cleared');
  });
}



// Initialize image upload on global page
$$(document).on('page:afterin', '.page[data-name="global"]', function (e, page) {
  setupBackgroundImageUpload();
});


