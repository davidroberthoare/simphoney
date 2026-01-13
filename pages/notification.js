$$(document).on('page:beforein', '.page[data-name="notification"]', function (e, page) {
  // console.log('Page beforeIn: ', e);
    console.log('Preparing notification page...');
    // Add your code to prepare play page here
    const sim = appData.currentSim;
    if (!sim || sim.type !== 'notification') {
      console.error('No valid notification sim');
      return;
    }
    // Set background image
    if (appData.global.background_img) {
      $$('.page[data-name="notification"]').css('background-image', `url(${appData.global.background_img})`);
    } else {
      $$('.page[data-name="notification"]').css('background-image', 'none');
    }
});



$$(document).on('page:afterin', '.page[data-name="notification"]', function (e, page) {
  console.log('play page displayed...', appData.currentSim);
  // Add your code to prepare play page here
  const sim = appData.currentSim;
  if (!sim || sim.type !== 'notification') {
    console.error('No valid notification sim');
    return;
  }

  // Create notification
  let notification = app.notification.create({
    icon: `<img src="${sim.sender_image}">`,
    title: sim.sender_name,
    titleRightText: sim.sent_time,
    // subtitle: appData.currentSim.sender_name,
    text: sim.message,
    closeOnClick: true,
    swipeToClose: true,
  });
  // Open it
  setTimeout(() => {
    notification.open();
  }, sim.delay * 1000);
})

