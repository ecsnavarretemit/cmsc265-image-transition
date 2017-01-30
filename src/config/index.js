/*!
 * Config Importer file
 *
 * Copyright(c) Exequiel Ceasar Navarrete <exequiel.navarrete09@gmail.com>
 * Licensed under MIT
 */

// read .env file immediately before processing any config file
require('dotenv').config();

const common = require('./components/common');
const logger = require('./components/logger');

module.exports = Object.assign({}, common, logger);


