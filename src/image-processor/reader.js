/*!
 * Reader
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const cv = require('opencv');

const reader = (imgPath) => {
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

module.exports = reader;


