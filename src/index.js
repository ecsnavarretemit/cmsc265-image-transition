/*!
 * App Bootstrapper
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const path = require('path');
const config = require('./config');
const fetchAll = require('./image-processor/fetch-all');
const reader = require('./image-processor/reader');
const validateDimensions = require('./image-processor/validate-dimensions');
const createSequence = require('./image-processor/create-sequence');

const resolvedPath = path.join(config.common.src, 'assets/img');

// start the promise execution.
fetchAll(resolvedPath)
  .then((images) => {
    // create an array of image promises
    const promises = images.map(imagePath => reader(imagePath));

    // process all the promises using the all method of Promise object
    return Promise.all(promises);
  })
  .then(cvImages => validateDimensions(cvImages))
  .then((cvImages) => {
    return createSequence(cvImages, config.imageProcessor.sequencePrefix, config.common.out);
  })
  .catch(err => console.error(err))
  ;


