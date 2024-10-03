'use strict';

const {
  DobUtilConstant
} = require('@dob/util');
const {
  DmmBaseConstant
} = require('@dmm/base');

class DmmAccountConstant {
  static MODULE_NAME = 'account';

  static PROP_USERNAME_TYPE = DobUtilConstant.VALUE_TYPE_STRING;
  static PROP_USERNAME_RULE = {
    ...DobUtilConstant.VALUE_RULE_NONEMPTY_STRING,
    checkHandler: ({value}) => {
      if(/^[a-zA-Z]/.test(value) === false) {
        return false;
      }
    },
    allowNull: true
  }

  static PROP_PASSWORD_TYPE = DobUtilConstant.VALUE_TYPE_STRING;
  static PROP_PASSWORD_RULE = {
    ...DobUtilConstant.VALUE_RULE_NONEMPTY_STRING,
    gte: 64,
    lte: 64
  }

  static PROP_TOKEN_TYPE = DobUtilConstant.VALUE_TYPE_STRING;
  static PROP_TOKEN_RULE = {
    ...DobUtilConstant.VALUE_RULE_NONEMPTY_STRING,
    gte: 32,
    lte: 32
  }

  static PROP_OP_TYPE_VALUE_CREATE = 1;
  static PROP_OP_TYPE_VALUE_UPDATE = 2;
  static PROP_OP_TYPE_VALUE_DELETE = 3;
  static PROP_OP_TYPE_VALUE_REGISTER = 101;
  static PROP_OP_TYPE_VALUE_LOGIN = 102;
  static PROP_OP_TYPE_VALUE_LOGOUT = 103;
  static PROP_OP_TYPE_VALUE_PASSWORD = 104;
  static PROP_OP_TYPE_TYPE = DobUtilConstant.VALUE_TYPE_NUMBER;
  static PROP_OP_TYPE_RULE = {
    list: [
      this.PROP_OP_TYPE_VALUE_CREATE,
      this.PROP_OP_TYPE_VALUE_UPDATE,
      this.PROP_OP_TYPE_VALUE_DELETE,
      this.PROP_OP_TYPE_VALUE_REGISTER,
      this.PROP_OP_TYPE_VALUE_LOGIN,
      this.PROP_OP_TYPE_VALUE_LOGOUT,
      this.PROP_OP_TYPE_VALUE_PASSWORD
    ]
  }
}

module.exports = DmmAccountConstant;