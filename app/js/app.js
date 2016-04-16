'use strict';

(function(window, document) {
  let videoPlayer = new VideoPlayer(window, document);

  /*
    Set video player attributes such as the controls and various sections.
    These attributes should not change in structure, so we can store them
    without worry.
  */
  videoPlayer.setAttr('player', document.getElementById('video-player'));
  videoPlayer.setAttr('videoControls', document.getElementById('video-controls'));
  videoPlayer.setAttr('initPlayBtn', document.getElementById('init-play-btn'));
  videoPlayer.setAttr('playButton', document.getElementById('play-btn'));
  videoPlayer.setAttr('fsButton', document.getElementById('fs-btn'));
  videoPlayer.setAttr('videoProgressCont', document.getElementById('video-progress-container'));
  videoPlayer.setAttr('videoProgressBar', document.getElementById('progress-bar'));
  videoPlayer.setAttr('videoPlaybackBar', document.getElementById('video-playback-bar'));
  videoPlayer.setAttr('videoBufferBar', document.getElementById('video-buffer-bar'));

  // Initialize video player
  videoPlayer.init();
}(this, document));
