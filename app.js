// Initialize app
var app = new Framework7({
  el: '#app',
  theme: 'auto',
  panel: { swipe: true },
  touch: { tapHold: true },
  routes: [
    { path: '/', name: 'home', url: './pages/home.html' },
    { path: '/global/', name: 'global', url: './pages/global.html' },
    { path: '/play/', name: 'play', url: './pages/play.html' },
  ]
});

// Get the main view with hash routing enabled
var mainView = app.views.create('.view-main', {
  // url: '/home',
});

var $$ = Dom7;

function navigateTo(route) {
  if(route=="/"){
    console.log("going Back to:", route);
    mainView.router.back(route);
  }else{
    console.log("Navigating to:", route);
    mainView.router.navigate(route);
  }
}

// For debugging, you can check current route:
$$(document).on('click', '.link', function () {
  console.log('Current route:', mainView.router.currentRoute);
});