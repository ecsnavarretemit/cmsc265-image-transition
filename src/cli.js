#!/usr/bin/env node

/*!
 * CLI App Bootstrapper
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const path = require('path');
const program = require('commander');
const config = require('./config');
const fetchAll = require('./image-processor/fetch-all');
const reader = require('./image-processor/reader');
const validateDimensions = require('./image-processor/validate-dimensions');
const createSequence = require('./image-processor/create-sequence');

let inputDirectory;
let outputDirectory = config.common.out;

// assemble the program
program
  .version('1.0.0')
  .arguments('<dir>')
  .option('-O, --output-dir <path>', 'output directory')
  .action((dir) => {
    inputDirectory = dir;
  })
  .parse(process.argv)
  ;

// show error message to the command line
if (typeof inputDirectory === 'undefined') {
  console.error('No input directory containing images provided!');
  process.exit(1);
}

// if outputDir is provided, replace the default output folder.
if (typeof program.outputDir !== 'undefined') {
  outputDirectory = path.resolve(process.cwd(), program.outputDir);
}

const resolvedPath = path.resolve(process.cwd(), inputDirectory);

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
    return createSequence(cvImages, config.imageProcessor.sequencePrefix, outputDirectory);
  })
  .catch(err => console.error(err))
  ;


