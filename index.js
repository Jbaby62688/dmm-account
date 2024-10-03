'use strict';

const DmmAccountConstant = require('./lib/constant/accountConstant');
const DmmAccountError = require('./lib/error/accountError');
const DmmAccountConfig = require('./lib/config/accountConfig');
const DmmAccountModel = require('./lib/model/accountModel');
const DmmAccountLogModel = require('./lib/model/accountLogModel');
const DmmAccountController = require('./lib/controller/accountController');
const DmmAccountLogController = require('./lib/controller/accountLogController');
const DmmAccountApi = require('./lib/api/accountApi');

function config(options) {
  DmmAccountConfig.dbClient = options.dbClient;
}

function init() {
  DmmAccountModel.init();
  DmmAccountLogModel.init();
}

function afterInit() {
}

module.exports = {
  config,
  init,
  afterInit,
  DmmAccountConstant,
  DmmAccountError,
  DmmAccountConfig,
  DmmAccountModel,
  DmmAccountLogModel,
  DmmAccountController,
  DmmAccountLogController,
  DmmAccountApi
};