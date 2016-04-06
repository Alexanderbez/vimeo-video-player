'use strict';

(function(window, document) {
  let videoPlayer = new VideoPlayer();

  /*
    Set video player attributes such as the controls and various sections.
    These attributes should not change in structure, so we can store them
    without worry.
  */
  videoPlayer.setAttr('player', document.getElementById('video-player'));
  videoPlayer.setAttr('videoControls', document.getElementById('video-controls'));
  videoPlayer.setAttr('playButton', document.getElementById('play-btn'));
  videoPlayer.setAttr('videoProgressCont', document.getElementById('video-progress'));
  videoPlayer.setAttr('videoProgressBar', document.getElementById('playback-progress'));

  videoPlayer.init();
}(this, document));
