/*!
 * App Bootstrapper Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const fs = require('fs');
const path = require('path');
const del = require('del');
const expect = require('chai').expect;
const config = require('./config');

// require the app
require('./index');

beforeEach(() => {
  if (!fs.existsSync(config.common.out)) {
    fs.mkdirSync(config.common.out);
  }
});

describe('Process Image', () => {
  it('should create file', () => {
    const fileExists = fs.existsSync(path.join(config.common.out, 'myGrayscaleImg.jpg'));

    expect(fileExists).to.equal(true);
  });
});

afterEach(() => {
  del.sync([config.common.out]);
});


