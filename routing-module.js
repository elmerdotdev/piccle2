"use strict";

Router.init("mainArea", [
  new Page("#signin", "pages/signin.html", "pages/js/signin.js"),
  new Page("#signup", "pages/signup.html", "pages/js/signup.js"),
  new Page("#testpage", "pages/test.html"),
  new Page("#home", "pages/home.html", "pages/js/home.js", "pages/css/home.css"),
  new Page("#history", "pages/history.html", "pages/js/history.js"),
  new Page("#leaderboard", "pages/leaderboard.html", "pages/js/leaderboard.js"),
  new Page("#play", "pages/play.html", "pages/js/play.js"),
  new Page("#settings", "pages/settings.html", "pages/js/settings.js"),
  new Page("#shop", "pages/shop.html", "pages/js/shop.js"),
]);