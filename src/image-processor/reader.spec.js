/*!
 * Reader Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const path = require('path');
const expect = require('chai').expect;
const cv = require('opencv');
const reader = require('./reader');
const config = require('../config');

describe('Image Reader', () => {
  const imagePath = path.join(config.common.src, 'assets/img-test/same/img-1.JPG');
  const nonExistentImagePath = path.join(config.common.src, 'assets/img-test/non-existent.JPG');

  it('should throw an error', (done) => {
    reader(nonExistentImagePath)
      .catch((err) => {
        expect(err.message).to.equal('Directory does not exist.');
        done();
      })
      ;
  });

  it('should create matrix instance', (done) => {
    reader(imagePath)
      .then((cvImage) => {
        expect(cvImage).to.be.an.instanceof(cv.Matrix);

        done();
      })
      ;
  });
});


