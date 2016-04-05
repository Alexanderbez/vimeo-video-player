'use strict';

(function(window, document) {
    let videoEl = document.getElementById('video-player');
    let videoPlayer = new VideoPlayer(videoEl);

    /*
      Set video player attributes such as the controls and various sections.
      These attributes should not change in structure, so we can store them
      without worry.
    */
    videoPlayer.setAttr('videoControls', document.getElementById('video-controls'));
    videoPlayer.setAttr('playButton', document.getElementById('play'));
    videoPlayer.setAttr('videoProgress', document.getElementById('video-progress'));
    videoPlayer.setAttr('videoProgressBox', document.getElementById('video-box'));
    videoPlayer.setAttr('fsButton', document.getElementById('full-screen'));

    videoPlayer.init();
}(this, document));
