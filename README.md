# Vimeo Video Player Challenge

A solution to the Vimeo coding exercise! That is developing a vimeo-esque video player!

## Requirements

* The video controls should be self contained and placed on top of the video
* The play button should trigger play and pause and toggle between the play and pause icons
* The buffer bar should fill to match the loading progress of the video
* The progress bar should fill to match the play progress of the video
* Add support for showing and hiding the controls when you hover on and off of the video
* Add support for scrubbing by clicking and dragging on the progress bar

Your source code should use vanilla JavaScript with no third party library dependencies. You may use techniques or features that work only in the latest browsers. Using transpilers and preprocessors (babel, webpack, sass, etc) is also fine. Feel free to add any other types of functionality you'd like.

## Video App

### Preliminary

`Grunt` tasks are implemented to transpile ES6 to ES5 for Safari support and to run a local server serving the video player app.

```shell
$ npm install
```

```shell
$ grunt
```

Visit `http://locahost:1337`

### Additional Functionality

* Full screen functionality
* Additional video player controls
* Various video timing elements in the control panel with toggle functionality

### Supported/Tested Browsers

* Chrome v47.0
* Firefox v45.0.2
* Safari v9.0.3

## Wish List/TODO

* Add volume/mute functionality
* Skin UI controls on full screen (browser dependent)
* Investigate Safari full screen height bug
