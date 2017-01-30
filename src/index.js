/*!
 * App Bootstrapper
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const fs = require('fs');
const path = require('path');
const cv = require('opencv');
const del = require('del');
const config = require('./config');
const fetchAll = require('./image-processor/fetch-all');
const reader = require('./image-processor/reader');
const validateDimensions = require('./image-processor/validate-dimensions');

const resolvedPath = path.join(config.common.src, 'assets/img');

fetchAll(resolvedPath)
  .then((images) => {
    // create an array of image promises
    const promises = images.map(imagePath => reader(imagePath));

    // process all the promises using the all method of Promise object
    return Promise.all(promises);
  })
  .then(cvImages => validateDimensions(cvImages))
  .then((cvImages) => {
    const numExec = cvImages.length - 1;
    const numImagesPerExec = 2;
    const numIterations = 10;

    // delete the existing putput directory
    if (fs.existsSync(config.common.out)) {
      console.log(`Deleting old output directory: ${config.common.out}`);

      del.sync([config.common.out]);
    }

    // show the path in the console
    console.log(`Creating output directory: ${config.common.out}`);

    // create output directory
    fs.mkdirSync(config.common.out);

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

    // show the message to the console
    console.log('Finished processing images.');
  })
  .catch(err => console.error(err))
  ;


