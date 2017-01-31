/*!
 * Validate Dimensions
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const path = require('path');
const expect = require('chai').expect;
const fetchAll = require('./fetch-all');
const reader = require('./reader');
const validateDimensions = require('./validate-dimensions');
const config = require('../config');

describe('Validate Dimensions', () => {
  const samePath = path.join(config.common.src, 'assets/img-test/same');
  const notSamePath = path.join(config.common.src, 'assets/img-test/not-same');

  it('should throw an error', (done) => {
    fetchAll(notSamePath)
      .then((images) => {
        // create an array of image promises
        const promises = images.map(imagePath => reader(imagePath));

        // process all the promises using the all method of Promise object
        return Promise.all(promises);
      })
      .then(cvImages => validateDimensions(cvImages))
      .catch((err) => {
        expect(err.message).to.equal('Input images should be the same dimensions.');
        done();
      })
      ;
  });

  it('should pass the validation', (done) => {
    fetchAll(samePath)
      .then((images) => {
        // create an array of image promises
        const promises = images.map(imagePath => reader(imagePath));

        // process all the promises using the all method of Promise object
        return Promise.all(promises);
      })
      .then(cvImages => validateDimensions(cvImages))
      .then((cvImages) => {
        expect(cvImages.length).to.be.above(0);
        done();
      })
      ;
  });
});


