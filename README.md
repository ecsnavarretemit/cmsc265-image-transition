# CMSC 265 Exercise 1 - Smooth transition from one image to another

[![Build Status](https://travis-ci.com/ecsnavarretemit/cmsc265-image-transition.svg?token=Epvjpqbou3YzbgbyBk2h&branch=master)](https://travis-ci.com/ecsnavarretemit/cmsc265-image-transition)

## Requirements

1. Node.js 6.x.x (Node.js 6.9.x or greater is recommended)
2. Python 2.x.x (Python 2.7.x or greater is recommended)
3. OpenCV 3

## Installing dependencies

This project requires a working installation of [OpenCV 3](http://opencv.org/). Please install this first before installing
the project dependencies.

Dependencies of this project can be installed via [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/).
It is recommended to use Yarn instead of NPM due to the assurance that the dependencies that will be installed is the same across all machines.
Although there is the `npm shrinkwrap` which aims to achieve what is stated above, read this about [yarn.lock and npm shrinkwrap](https://yarnpkg.com/en/docs/yarn-lock).

_Note: Make sure that Python 2.x.x is present on your path since OpenCV bindings for Node.js needs this in order for it to be compiled._

## Running the Program

This program can be run using the command `yarn start` if you use Yarn or `npm start` if you use NPM.
The output image files will be under the `out` directory generated at the project root.

This can also be installed as executable script using the command `npm install -g`. After installation which could take some time,
You may now be able to use the command `image-sequencer <directory containing images>`. For more info, you can type: `image-sequencer --help`.

## Creating Video

You may create video out of the image sequences by using third party software like Adobe Photoshop, Virtualdub \
and many more but you can create it directly from the command line if you have `ImageMagick` and `ffmpeg` installed on your path.

I have setup a simple NPM script that utilizes `ImageMagick` and `ffmpeg`. You may run the command `yarn run create-video` if you use Yarn
or `npm run create-video`  if you use NPM.

## Running Tests

This program includes unit tests written using Mocha test framework and Chai assertion library.
Unit tests can be run using `yarn test` if you use Yarn or `npm test` if you use NPM.

## License

MIT


