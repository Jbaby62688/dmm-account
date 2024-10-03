'use strict';

const {
  DataTypes
} = require('@dob/db');
const {
  DmmBaseModel
} = require('@dmm/base');
const AccountConfig = require('../config/accountConfig');

class AccountModel extends DmmBaseModel {
  static init() {
    super.init(
      {
        id: {
          type: DataTypes.BIGINT(20).UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING(255),
          allowNull: true,
          defaultValue: null
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: ''
        },
        tokenA: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
          field: 'token_a'
        }
      },
      {
        sequelize: AccountConfig.dbClient,
        modelName: 'account',
        tableName: 't_account',
        timestamps: false
      }
    )
  }
}

module.exports = AccountModel;