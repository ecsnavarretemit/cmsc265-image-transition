/*!
 * Config - Image Processor
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const joi = require('joi');

const envVarsSchema = joi
  .object({
    SEQUENCE_PREFIX: joi.string()
      .default('seq'),
  })
  .unknown()
  .required()
  ;

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  imageProcessor: {
    sequencePrefix: envVars.SEQUENCE_PREFIX,
  },
};

module.exports = config;


