'use strict';

const {
  DmmBaseError
} = require('@dmm/base');
const AccountConstant = require('../constant/accountConstant');

class AccountError extends DmmBaseError {
  static ACCOUNT_NOT_EXIST = {code: 10001, msg: '账号不存在'};
  static ACCOUNT_VALIDATE_FAIL = {code: 10002, msg: '账号约束校验失败'};
  static ACCOUNT_PASSWORD_MISSMATCH = {code: 10003, msg: '密码不匹配'};
  static ACCOUNT_NOT_ENABLE = {code: 10004, msg: '账号已禁用'};
  static ACCOUNT_TOKEN_MISMATCH = {code: 10005, msg: 'Token不匹配'};

  static ACCOUNT_USERNAME_EXIST = {code: 20001, msg: '用户名已存在'};
  static ACCOUNT_PHONE_EXIST = {code: 20002, msg: '手机号已存在'};
  static ACCOUNT_EMAIL_EXIST = {code: 20003, msg: '邮箱已存在'};
  static ACCOUNT_ID_CARD_NUMBER_EXIST = {code: 20004, msg: '身份证号已存在'};
  static ACCOUNT_NICK_EXIST = {code: 20005, msg: '昵称已存在'};
  
  static USER_NOT_LOGIN = {code: 30001, msg: '用户未登陆'};
  static REAL_NAME_AUTH_FAIL = {code: 30002, msg: '实名认证失败'};


  constructor(
    {
      code,
      msg
    }
  ) {
    super(
      {
        code,
        msg
      }
    );
    this.module = AccountConstant.MODULE_NAME;
  }
}

module.exports = AccountError;