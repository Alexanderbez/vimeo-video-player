'use strict';

/**
 * Custom Vimeo video player class. Using this class, modifications and
 * features can be controlled.
 */
class VideoPlayer {
  /**
   * VideoPlayer class constructor.
   *
   * @return {VideoPlayer} returns an instance of a VideoPlayer.
   */
  constructor(window, document) {
    /*
      Keep reference to both the window and document objects in order to
      support features such as full screen, video scrubbing, and buffering.
    */
    this.window = window;
    this.document = document;
    this.currentTime = 0;
    this.inFullScreen = false;
    this.videoProgressInterval;
    this.videoBufferInterval;
    this.attributes = new Map();
  }

  /**
   * Sets an attribute of a VideoPlayer by a given name with a specific
   * value.
   *
   * @name {String} The name to which associate the value with.
   * @value {Object} The desired value to store.
   * @return {Object} The value that was set.
   */
  setAttr(name, value) {
    this.attributes.set(name, value);
    return value;
  }

  /**
   * Gets an attribute of a VideoPlayer by a given name.
   *
   * @name {String} The name to which to query for.
   * @return {Object} The value that was retrieved.
   */
  getAttr(name) {
    return this.attributes.get(name);
  }

  /**
   * Handler to show or hide the video player controls based upon some action.
   *
   * @return {Boolean}
   */
  initShowHideControls() {
    let videoControls = this.getAttr('videoControls');
    let player = this.getAttr('player');
    let initPlayBtn = this.getAttr('initPlayBtn');

    // Setup init play button
    initPlayBtn.addEventListener('click', function() {
      initPlayBtn.style.opacity = 0;
      setTimeout(function() {
        initPlayBtn.style.display = 'none';
      }, 1000);
      videoControls.style.display = 'block';
      this.togglePlayPause();
    }.bind(this), false);

    // Add event listeners for mouse hover on the video controls panel
    player.addEventListener('mouseover', function() {
      videoControls.style.opacity = 1;
    }, false);

    videoControls.addEventListener('mouseover', function() {
      videoControls.style.opacity = 1;
    }, false);

    player.addEventListener('mouseleave', function() {
      videoControls.style.opacity = 0;
    }, false);

    videoControls.addEventListener('mouseout', function() {
      videoControls.style.opacity = 0;
    }, false);

    return true;
  }

  /**
   * Implements full screen toggle support.
   *
   * @return {Boolean}
   */
  initFullScreenToggle() {
    let player = this.getAttr('player');
    let fsButton = this.getAttr('fsButton');

    fsButton.addEventListener('click', function() {
      let inFullScreen = this.document.fullscreenEnabled ||
        this.document.mozFullscreenEnabled ||
        this.document.webkitIsFullScreen ? true : false;

      if (!inFullScreen) {
        if (player.webkitEnterFullscreen) {
          player.webkitEnterFullscreen();
        } else if (player.mozRequestFullScreen) {
          player.mozRequestFullScreen();
        }
      }
    }.bind(this), false);

    return true;
  }

  /**
   * When appropriate, perform initial procedures on the video player.
   *
   * @return {Object}
   */
  initializeControls() {
    this.initShowHideControls();
    this.initFullScreenToggle();
  }

  /**
   * TODO.
   *
   * @return {Object}
   */
  togglePlayPause() {
    let player = this.getAttr('player');

    if (player.paused || player.ended) {
      // Update the currentTime if the video has ended
      if (player.ended) {
        player.currentTime = 0;
      }

      player.play();
    } else {
      player.pause();
    }
  }

  /**
   * TODO.
   *
   * @return {Object}
   */
  pauseVideo() {
    console.log('pauseVideo called');
  }

  /**
   * Update the progress bar based upon the current progress of the video being
   * played. The necessary DOM elements are supplied as arguments to avoid
   * having to repeatedly fetch them from the Map.
   *
   * @player {HTMLVideoElement} Video DOM element.
   * @videoPlaybackBar {Object} Video playback bar DOM element.
   * @videoProgressBar {Object} Video progress container DOM element.
   * @return {Object}
   */
  updatePlaybackProgress(player, videoPlaybackBar, videoProgressBar) {
    // Set width based upon current position and overal length
    let currTime = player.currentTime;
    let duration = player.duration;
    let position = (currTime / duration) * videoProgressBar.offsetWidth;

    // Update playback progress time
    this.currentTime = position;

    // Set progress bar width accordingly
    videoPlaybackBar.style.width = `${position}px`
  }

  /**
   * Track video playback progress and update the player accordingly.
   *
   * @return {Object}
   */
  trackPlaybackProgress() {
    let player = this.getAttr('player');
    let videoPlaybackBar = this.getAttr('videoPlaybackBar');
    let videoProgressBar = this.getAttr('videoProgressBar');

    /*
      The update frequency should ideally be based upon some metric, but we'll
      use a 50 millisecond update frequency for simplicity.
    */
    (function progressPlayback(videoPlayer) {
      videoPlayer.updatePlaybackProgress(player, videoPlaybackBar, videoProgressBar);
      videoPlayer.videoProgressInterval = setTimeout(function() {
        progressPlayback(videoPlayer);
      }, 50);
    })(this);
  }

  /**
   * Stop tracking the video playback progress. This happens when a video is
   * paused. The timeout is simply cleared from when `progressPlayback` is
   * invoked.
   *
   * @return {Object}
   */
  haltTrackingPlaybackProgress() {
    clearTimeout(this.videoProgressInterval);
  }

  /**
   * Updates the video buffer progress bar based upon the `buffered` object on
   * the video element.
   *
   * @player {HTMLVideoElement} Video DOM element.
   * @videoBufferBar {Object} Video buffer bar DOM element.
   * @videoProgressBar {Object} Video progress container DOM element.
   * @return {Object}
   */
  updateBufferProgress(player, videoBufferBar, videoProgressBar) {
    let buffEnd = player.buffered.end(0);
    let duration = player.duration;
    let buffered = (buffEnd / duration) * videoProgressBar.offsetWidth;

    videoBufferBar.style.width = `${buffered}px`;
  }

  /**
   * Resets the video buffered progress interval.
   *
   * @return {Object}
   */
  resetBufferProgress() {
    clearTimeout(this.videoBufferInterval);
  }

  /**
   * TODO.
   *
   * @return {Object}
   */
  bufferVideo() {
    let player = this.getAttr('player');
    let videoBufferBar = this.getAttr('videoBufferBar');
    let videoProgressBar = this.getAttr('videoProgressBar');

    (function updateVideoBuffer(videoPlayer) {
      videoPlayer.updateBufferProgress(player, videoBufferBar, videoProgressBar);
      videoPlayer.videoBufferInterval = setTimeout(function() {
        updateVideoBuffer(videoPlayer);
      }, 100);
    })(this);
  }

  /**
   * Add the appropriate actions to the play/pause button.
   *
   * @return {Object}
   */
  initializePlayActions() {
    let player = this.getAttr('player');
    let playButton = this.getAttr('playButton');

    // Add event listeners for when the play/pause button is pressed
    player.addEventListener('click', this.togglePlayPause.bind(this), false);
    playButton.addEventListener('click', this.togglePlayPause.bind(this), false);

    // Add event listeners to handle toggling of the play/pause SVG upon click
    player.addEventListener('play', function() {
      playButton.setAttribute('title', 'Pause');
      playButton.children[0].className = 'fa fa-pause';

      // Track the video progress
      this.trackPlaybackProgress();
    }.bind(this), false);

    player.addEventListener('pause', function() {
      playButton.setAttribute('title', 'Play');
      playButton.children[0].className = 'fa fa-play';

      // Update video playback progress when paused
      this.haltTrackingPlaybackProgress();
    }.bind(this), false);

    player.addEventListener('ended', function() {
      this.currentTime = 0;
      this.pauseVideo();
    }.bind(this), false);

    return true;
  }

  /**
   * Initialize video controls after a desired state.
   *
   * @return {Object}
   */
  initializeVideoControls() {
    let player = this.getAttr('player');

    player.addEventListener(
      'loadeddata',
      function() {
        this.initializeControls();
        this.bufferVideo();
      }.bind(this),
      false
    );
  }

  /**
   * TODO.
   *
   * @pos {Number} TODO.
   * @return {Object}
   */
  setPlaybackProgress(pos) {
    let player = this.getAttr('player');
    let videoPlaybackBar = this.getAttr('videoPlaybackBar');
    let videoProgressCont = this.getAttr('videoProgressCont');

    // Find the new scrubed location
    let posX = videoProgressCont.offsetLeft;
    let tmp = videoProgressCont;

    while (tmp = tmp.offsetParent) {
      posX += tmp.offsetLeft;
    }

    // Determine where the new playback position is
    let clickPos = (pos - posX) / videoProgressCont.offsetWidth;
    let percent = Math.max(0, Math.min(1, clickPos));

    player.currentTime = percent * player.duration;
    videoPlaybackBar.style.width = `$(percent * videoProgressCont.offsetWidth)px`;
  }

  /**
   * Add necessary listeners and handlers to support video playback scrubbing.
   *
   * @return {Object}
   */
  initializeScrubVideoProgress() {
    let player = this.getAttr('player');
    let videoProgressCont = this.getAttr('videoProgressCont');

    videoProgressCont.addEventListener(
      'mousedown',
      function() {
        // Stop tracking video playback progress
        this.haltTrackingPlaybackProgress();

        // Toggle video playback
        this.togglePlayPause();

        // Set new (scrubbed) playback progress based on a mouse event
        this.document.onmousemove = function(e) {
          this.setPlaybackProgress(e.pageX);
        }.bind(this);

        videoProgressCont.onmouseup = function(e) {
          this.document.onmouseup = null;
          this.document.onmousemove = null;

          // Resume video
          player.play();

          // Update playback progress
          this.setPlaybackProgress(e.pageX);
          this.trackPlaybackProgress();
          this.bufferVideo();
        }.bind(this);
      }.bind(this), true);
  }

  /**
   * Perform neccessary initialization operations on the video player itself
   * upon being created.
   *
   * @return {Object}
   */
  init() {
    // Initialize video controls
    this.initializeVideoControls();

    // Play/pause button handler
    this.initializePlayActions();

    // Initialize scrubbing functionality
    this.initializeScrubVideoProgress();

    // TMP
    let player = this.getAttr('player');
    player.volume = 0;
  }
}
