function populateGlobalSettings() {
  // Set background color selector
  console.log("Populating global settings:", appData.global);
  $$('#global-background').val(appData.global.background);
  $$('#global-os').val(appData.global.os);
  $$('#global-dark_mode').prop('checked', appData.global.dark_mode ? 'checked' : '');
}


function updateGlobalSettings() {
    appData.global.os = $$("#global-os").val();
    appData.global.dark_mode = $$("#global-dark_mode").prop('checked');
    console.log('Global settings updated:', appData.global);
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



$$(document).on('page:beforeout', '.page[data-name="global"]', function (e, page) {
  updateGlobalSettings();
});

$$(document).on('page:beforein', '.page[data-name="global"]', function (e, page) {
});

// Initialize image upload on global page
$$(document).on('page:afterin', '.page[data-name="global"]', function (e, page) {
  populateGlobalSettings();
  setupBackgroundImageUpload();
});


