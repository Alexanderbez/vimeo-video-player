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
  videoPlayer.setAttr('playButton', document.getElementById('play'));
  videoPlayer.setAttr('videoProgress', document.getElementById('video-progress'));
  videoPlayer.setAttr('videoProgressBox', document.getElementById('video-box'));
  videoPlayer.setAttr('fsButton', document.getElementById('full-screen'));

  videoPlayer.init();
}(this, document));
