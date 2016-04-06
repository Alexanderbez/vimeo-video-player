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
  constructor() {
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
   * @return {Object} TODO.
   */
  showHideControls() {
    let videoControls = this.getAttr('videoControls');
    let player = this.getAttr('player')

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
  }

  /**
   * When appropriate, perform initial procedures on the video player.
   *
   * @return {Object} TODO.
   */
  initializeControls() {
    console.log('initializeControls called');
    this.showHideControls();
  }

  /**
   * Performs various initialization operations on the video player itself
   * upon being created.
   *
   * @return {Object} .
   */
  init() {
    console.log('init called');
    let player = this.getAttr('player')

    player.addEventListener(
      'loadeddata',
      this.initializeControls.bind(this), false
    );
  }
}
