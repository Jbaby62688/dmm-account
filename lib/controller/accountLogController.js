'use strict';

const {
  DobLogApi
} = require('@dob/log');
const {
  DobUtilConstant,
  DobUtilApi
} = require('@dob/util');
const {
  DmmBaseConstant
} = require('@dmm/base');
const AccountConstant = require('../constant/accountConstant');
const AccountLogModel = require('../model/accountLogModel');

class AccountLogController {
  /**
   * @description 创建
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {Number} param1.accountId 账号ID
   * @param {Number} param1.opUserId 操作用户ID
   * @param {Number} param1.opType 操作类型
   * @param {Object} param1.opData 操作数据
   * @param {String} param1.ip IP地址
   * @param {String} param1.transactionId 事务ID
   * @param {Object} param2
   * @param {Boolean} param2.throwErrorFlag 是否抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Promise<Boolean>}
   */
  static async create(
    {
      accountId,
      opUserId,
      opType,
      opData,
      ip = '',
      transactionId = ''
    },
    {
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmAccountLogController::create';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);
    
    try {
      //获取事务
      const transaction = ctx.state?.transaction;

      //检查参数
      logger.debug('accountId:', accountId);
      DobUtilApi.checkValue(
        {
          value: accountId
        },
        {
          type: DmmBaseConstant.PROP_ID_TYPE,
          rule: {
            ...DmmBaseConstant.PROP_ID_RULE
          }
        },
        {
          ctx
        }
      );

      logger.debug('opUserId:', opUserId);
      DobUtilApi.checkValue(
        {
          value: opUserId
        },
        {
          type: DmmBaseConstant.PROP_ID_TYPE,
          rule: {
            ...DmmBaseConstant.PROP_ID_RULE
          }
        },
        {
          ctx
        }
      );

      logger.debug('opType:', opType);
      DobUtilApi.checkValue(
        {
          value: opType
        },
        {
          type: AccountConstant.PROP_OP_TYPE_TYPE,
          rule: {
            ...AccountConstant.PROP_OP_TYPE_RULE
          }
        },
        {
          ctx
        }
      );

      logger.debug('ip:', ip);
      DobUtilApi.checkValue(
        {
          value: ip
        },
        {
          type: DmmBaseConstant.PROP_IP_TYPE,
          rule: {
            ...DmmBaseConstant.PROP_IP_RULE
          }
        },
        {
          ctx
        }
      );

      logger.debug('transactionId:', transactionId);
      DobUtilApi.checkValue(
        {
          value: transactionId
        },
        {
          type: DmmBaseConstant.PROP_TRANSACTION_ID_TYPE,
          rule: {
            ...DmmBaseConstant.PROP_TRANSACTION_ID_RULE
          }
        },
        {
          ctx
        }
      );

      //创建
      await AccountLogModel.create(
        {
          accountId,
          opUserId,
          opType,
          opData,
          ip,
          transactionId
        },
        {
          transaction
        }
      );

      //返回
      return true;
    }
    catch(error) {
      //抛出错误
      if(throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return false;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }
}

module.exports = AccountLogController;