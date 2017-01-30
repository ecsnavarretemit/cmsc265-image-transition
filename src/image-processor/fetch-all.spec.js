/*!
 * Fetch All Images Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const path = require('path');
const expect = require('chai').expect;
const fetchAll = require('./fetch-all');
const config = require('../config');

describe('Fetch Images', () => {
  const resolvedPath = path.join(config.common.src, 'assets/img-test/same');
  const noImagePath = path.join(config.common.src, 'assets/img-test');
  const nonExistentPath = path.join(config.common.src, 'non-existent-path');

  it('should throw an error on non-existent directory', (done) => {
    fetchAll(nonExistentPath)
      .catch((err) => {
        expect(err.message).to.equal('Directory does not exist.');
        done();
      })
      ;
  });

  it('should throw an error on directory that contains no images', (done) => {
    fetchAll(noImagePath)
      .catch((err) => {
        expect(err.message).to.equal('Directory does not contain any images.');
        done();
      })
      ;
  });

  it('should fetch images', (done) => {
    fetchAll(resolvedPath)
      .then((images) => {
        expect(images.length).to.be.above(0);

        done();
      })
      ;
  });
});


