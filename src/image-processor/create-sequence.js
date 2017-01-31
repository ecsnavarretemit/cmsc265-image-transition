/*!
 * Create Sequence
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const fs = require('fs');
const path = require('path');
const cv = require('opencv');
const del = require('del');
const template = require('lodash.template');

const createSequence = (cvImages, filenamePrefix, outputDir) => {
  const numExec = cvImages.length - 1;
  const numImagesPerExec = 2;
  const numIterations = 10;
  const templateStr = '<%= prefix %>-<%= sequenceNumber %>.jpg';
  const templateFn = template(templateStr);

  // delete the existing putput directory
  if (fs.existsSync(outputDir)) {
    console.log(`Deleting old output directory: ${outputDir}`);

    del.sync([outputDir]);
  }

  // show the path in the console
  console.log(`Creating output directory: ${outputDir}`);

  // create output directory
  fs.mkdirSync(outputDir);

  let imageCtr = 0;
  for (let i = 0; i < numExec; i += 1) {
    const imgSet = cvImages.slice(i, numImagesPerExec + i);
    let k = 0;

    for (let j = numIterations; j >= 0; j -= 1) {
      const fadein1 = j / parseFloat(`${numIterations}`);
      const fadein2 = k / parseFloat(`${numIterations}`);

      const result = new cv.Matrix(imgSet[0].width(), imgSet[0].height());
      result.addWeighted(imgSet[0], fadein1, imgSet[1], fadein2, 0);
      result.save(path.join(outputDir, templateFn({
        prefix: filenamePrefix,
        sequenceNumber: (imageCtr + 1),
      })));

      imageCtr += 1;
      k += 1;
    }
  }

  // show the message to the console
  console.log('Finished processing images.');
};

module.exports = createSequence;


