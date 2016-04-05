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
     * Performs various initialization operations on the video player itself
     * upon being created.
     *
     * @return {Object} .
     */
    init() {
        video.addEventListener('loadeddata', this.initializeControls, false);
    }
}
