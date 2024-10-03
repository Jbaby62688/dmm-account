'use strict';

const {
  DataTypes
} = require('@dob/db');
const {
  DmmBaseModel
} = require('@dmm/base');
const AccountConfig = require('../config/accountConfig');

class AccountLogModel extends DmmBaseModel {
  static init() {
    super.init(
      {
        id: {
          type: DataTypes.BIGINT(20).UNSIGNED,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        accountId: {
          type: DataTypes.BIGINT(20).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          field: 'account_id'
        },
        opUserId: {
          type: DataTypes.BIGINT(20).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          field: 'op_user_id'
        },
        opType: {
          type: DataTypes.TINYINT(3).UNSIGNED,
          allowNull: false,
          defaultValue: 0,
          field: 'op_type'
        },
        opTimestamp: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW(),
          field: 'op_timestamp'
        },
        opData: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: {},
          field: 'op_data'
        },
        ip: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: ''
        },
        transactionId: {
          type: DataTypes.STRING(255),
          allowNull: false,
          defaultValue: '',
          field: 'transaction_id'
        }
      },
      {
        sequelize: AccountConfig.dbClient,
        modelName: 'accountLog',
        tableName: 't_account_log',
        timestamps: false
      }
    )
  }
}

module.exports = AccountLogModel;