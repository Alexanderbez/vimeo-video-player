'use strict';

(function(window, document) {
  let videoEl = document.getElementById('video-player');
  let videoPlayer = new VideoPlayer(videoEl);

  videoPlayer.init();
}(this, document));
