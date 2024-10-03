'use strict';

const {
  DobLogApi
} = require('@dob/log');
const {
  DobUtilConstant,
  DobUtilApi
} = require('@dob/util');
const {
  DmmBaseConstant,
  DmmBaseApi
} = require('@dmm/base');
const AccountConstant = require('../constant/accountConstant');
const AccountError = require('../error/accountError');
const AccountConfig = require('../config/accountConfig');
const AccountModel = require('../model/accountModel');
const AccountController = require('../controller/accountController');
const AccountLogController = require('../controller/accountLogController');


class AccountApi extends DmmBaseApi {
  /**
   * @description 登陆
   */


  /**
   * @description 注册
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {String} param1.username 用户名
   * @param {Object} param2
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Promise<AccountModel>}
   */
  static async register(
    {
      username
    },
    {
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmAccountApi::register';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger?.debug(`=====开始执行${identifier}=====`);
    
    try {
      //创建账号
      let account = await AccountController.create(
        {
          username
        },
        {
          ctx
        }
      );

      //记录日志
      await AccountLogController.create(
        {
          accountId: account.id,
          opUserId: account.id,
          opType: AccountConstant.PROP_OP_TYPE_VALUE_REGISTER,
          opData: {
            username
          },
          ip: ctx?.ip,
          transactionId: ctx?.transactionId
        },
        {
          ctx
        }
      );
      
      //返回
      return account;
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return null;
      }
    }
    finally {
      //结束执行
      logger?.debug(`=====结束执行${identifier}=====`);
    }
  }
}

module.exports = AccountApi