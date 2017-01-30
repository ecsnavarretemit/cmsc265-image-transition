/*!
 * Dimension Validator
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const validateDimensions = (cvImages) => {
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

module.exports = validateDimensions;


