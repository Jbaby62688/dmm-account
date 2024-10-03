'use strict';

const {
  DobLogApi
} = require('@dob/log');
const {
  DobUtilConstant,
  DobUtilApi
} = require('@dob/util');
const {
  DmmBaseConfig
} = require('@dmm/base');

const logger = DobLogApi.getLogger(
  {
    category: 'DmmAccountConfig'
  }
);

class AccountConfig extends DmmBaseConfig {
  
}

module.exports = AccountConfig;