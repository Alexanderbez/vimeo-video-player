'use strict';

/**
 * Custom Vimeo video player class. Using this class, modifications and
 * features can be controlled.
 */
class VideoPlayer {
  /**
   * VideoPlayer class constructor.
   * 
   * @player {Object} video player DOM object.
   * @return {VideoPlayer} returns an instance of a VideoPlayer.
   */
  constructor(player) {
    this.player = player;
  }

  /**
   * TODO.
   * 
   * @return {TODO} TODO.
   */
  init() {
    // 
    this.player.removeAttribute('controls');
    // video.addEventListener('loadeddata', this.initializeControls, false);
  }
}
