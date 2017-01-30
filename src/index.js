/*!
 * App Bootstrapper
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const fs = require('fs');
const path = require('path');
const cv = require('opencv');
const config = require('./config');

const resolvedPath = path.join(config.common.src, 'assets/img');

const getImages = (directory) => {
  const findImagesPromise = new Promise((resolve, reject) => {
    // read the directory and its contents
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(err);
      }

      const processed = files
        .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)) // remove unnecessary files (e.g. dot files)
        .filter(item => (path.extname(item).toLowerCase() === '.jpg')) // include only jpg files
        .map(item => `${resolvedPath}/${item}`) // resolve the full path of the image
        ;

      // resolve the promise with the processed images being passed
      resolve(processed);
    });
  });

  return findImagesPromise;
};

const readImage = (imgPath) => {
  const cvImageReaderPromise = new Promise((resolve, reject) => {
    // read the image ung opencv
    cv.readImage(imgPath, (err, img) => {
      if (err) {
        reject(err);
      }

      // resolve the promise by passing the cv image instance
      resolve(img);
    });
  });

  return cvImageReaderPromise;
};

const validateImages = (cvImages) => {
  const imageValidationPromise = new Promise((resolve, reject) => {
    let oldHeight = null;
    let oldWidth = null;

    // check whether all images is of the same dimensions.
    const shouldBeSameDimensions = cvImages.every((cvImage) => {
      const imageWidth = cvImage.width();
      const imageHeight = cvImage.height();

      if (oldWidth === null) {
        oldWidth = imageWidth;
      }

      if (oldHeight === null) {
        oldHeight = cvImage.height();
      }

      // all images should be the same as the first width and height detected
      return (oldWidth === imageWidth && oldHeight === imageHeight);
    });

    // reject with an error indicating what's wrong
    if (!shouldBeSameDimensions) {
      reject(new Error('Input images should be the same dimensions'));
    }

    // return the cvimages
    resolve(cvImages);
  });

  return imageValidationPromise;
};

getImages(resolvedPath)
  .then((images) => {
    // create an array of image promises
    const promises = images.map(imagePath => readImage(imagePath));

    // process all the promises using the all method of Promise object
    return Promise.all(promises);
  })
  .then(cvImages => validateImages(cvImages))
  .then((cvImages) => {
    const numExec = cvImages.length - 1;
    const numImagesPerExec = 2;
    const numIterations = 10;

    // create the output folder if it does not exist
    if (!fs.existsSync(config.common.out)) {
      fs.mkdirSync(config.common.out);
    }

    let imageCtr = 0;
    for (let i = 0; i < numExec; i += 1) {
      const imgSet = cvImages.slice(i, numImagesPerExec + i);
      let k = 0;

      for (let j = numIterations; j >= 0; j -= 1) {
        const fadein1 = j / parseFloat(`${numIterations}`);
        const fadein2 = k / parseFloat(`${numIterations}`);

        const result = new cv.Matrix(imgSet[0].width(), imgSet[0].height());
        result.addWeighted(imgSet[0], fadein1, imgSet[1], fadein2, 0);
        result.save(path.join(config.common.out, `morph-${imageCtr}.jpg`));

        imageCtr += 1;
        k += 1;
      }
    }
  })
  .catch(err => console.error(err))
  ;


