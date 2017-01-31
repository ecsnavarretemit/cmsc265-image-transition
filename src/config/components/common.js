/*!
 * Config - Common
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

const path = require('path');
const joi = require('joi');

const envVarsSchema = joi
  .object({
    OUT_DIR: joi.string()
      .default(path.join(process.cwd(), 'out')),
    SRC_DIR: joi.string()
      .default(path.join(process.cwd(), 'src')),
  })
  .unknown()
  .required()
  ;

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  common: {
    out: envVars.OUT_DIR,
    src: envVars.SRC_DIR,
  },
};

module.exports = config;


