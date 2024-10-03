'use strict';
const crypto = require('crypto');
const {
  DobLogApi
} = require('@dob/log');
const {
  DobUtilConstant,
  DobUtilApi
} = require('@dob/util');
const {
  DmmBaseConstant,
  DmmBaseController
} = require('@dmm/base');
const AccountConstant = require('../constant/accountConstant');
const AccountError = require('../error/accountError');
const AccountConfig = require('../config/accountConfig');
const AccountModel = require('../model/accountModel');

class AccountController extends DmmBaseController {
  /**
   * @description 模型getter
   * 
   * @static
   * 
   * @returns {AccountModel} AccountModel
   */
  static get Model() {
    return AccountModel;
  }


  /**
   * @description 检查模型
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {AccountModel} param1.model 模型
   * @param {Object} param2
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Boolean}
   */
  static checkModel(
    {
      model
    },
    {
      throwErrorFlag = true,
      ctx
    } = {}
  ) {
    const identifier = 'DmmAccountController::checkModel';

    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );

    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);

    try {
      super.checkModel(
        {
          model
        },
        {
          ctx
        }
      );

      //返回
      return true;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw new AccountError(AccountError.ACCOUNT_NOT_EXIST);
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


  /**
   * @description 获取模型by username
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {String} param1.username 用户名
   * @param {Object} param2
   * @param {Boolean} [param2.checkModelFlag=true] 检查模型标志
   * @param {Boolean} [param2.throwErrorFlag=true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {AccountModel}
   */
  static getModelFromCacheByUsername(
    {
      username
    },
    {
      checkModelFlag = true,
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmAccountController::getModelFromCacheByUsername';

    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );

    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);

    try {
      //检查参数
      logger.debug('username:', username);
      DobUtilApi.checkValue(
        {
          value: username
        },
        {
          type: AccountConstant.PROP_USERNAME_TYPE,
          rule: {
            ...AccountConstant.PROP_USERNAME_RULE
          }
        }
      );

      //获取列表
      let list = this.getModelListFromCache(
        {
          filterHandler: (item) => {
            return item.username === username
          }
        },
        {
          ctx
        }
      );

      //获取模型
      let model = list.length > 0 ? list[0] : null;

      //检查模型
      if (checkModelFlag === true) {
        this.checkModel(
          {
            model
          },
          {
            ctx
          }
        );
      }

      //返回
      return model;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        logger.error(error);
        return null;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`);
    }

  }


  /**
   * @description 创建
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {String} [param1.username] 用户名
   * @param {String} [param1.password] 密码
   * @param {String} [param1.tokenA] Token
   * @param {Object} param2
   * @param {Boolean} [param2.useCacheFlag] 使用缓存标志
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {Promise<AccountModel>}
   */
  static async create(
    {
      username,
      password,
      tokenA
    },
    {
      useCacheFlag,
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmAccountController::create';

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

      //处理参数
      if (useCacheFlag === undefined) {
        useCacheFlag = ctx.state?.useCacheFlag !== undefined ? ctx.state.useCacheFlag : true;
      }

      //检查参数
      logger.debug('username:', username);
      DobUtilApi.checkValue(
        {
          value: username
        },
        {
          type: AccountConstant.PROP_USERNAME_TYPE,
          rule: {
            ...AccountConstant.PROP_USERNAME_RULE,
            allowUndefined: true
          }
        }
      );

      logger.debug('password:', password);
      DobUtilApi.checkValue(
        {
          value: password
        },
        {
          type: AccountConstant.PROP_PASSWORD_TYPE,
          rule: {
            ...AccountConstant.PROP_PASSWORD_RULE,
            allowUndefined: true
          }
        }
      );

      logger.debug('tokenA:', tokenA);
      DobUtilApi.checkValue(
        {
          value: tokenA
        },
        {
          type: AccountConstant.PROP_TOKEN_TYPE,
          rule: {
            ...AccountConstant.PROP_TOKEN_RULE,
            allowUndefined: true
          }
        }
      );

      logger.debug('useCacheFlag:', useCacheFlag);
      DobUtilApi.checkValue(
        {
          value: useCacheFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN,
        }
      );

      logger.debug('throwErrorFlag:', throwErrorFlag);
      DobUtilApi.checkValue(
        {
          value: throwErrorFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN,
        }
      );

      //创建
      let account = await AccountModel.create(
        {
          username,
          password,
          tokenA
        },
        {
          transaction
        }
      );

      //添加到缓存
      if (useCacheFlag === true) {
        this.addModelToCache(
          {
            model: account
          },
          {
            ctx
          }
        );
      }

      //返回
      return account;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
        throw error;
      }
      //返回
      else {
        return null;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 更新
   * 
   * @static
   * 
   * @async
   * 
   * @param {Object} param1
   * @param {AccountModel} param1.account 账号
   * @param {Object} param2
   * @param {String} [param2.username] 用户名
   * @param {String} [param2.password] 密码
   * @param {String} [param2.tokenA] token
   * @param {Object} param3
   * @param {Boolean} [param3.autoSaveFlag] 自动保存标志
   * @param {Boolean} [param3.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param3.ctx 上下文
   * 
   * @returns {Promise<Boolean>}
   */
  static async update(
    {
      account
    },
    {
      username,
      password,
      tokenA
    },
    {
      autoSaveFlag,
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmAccountController::update';

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

      //处理参数
      if (autoSaveFlag === undefined) {
        autoSaveFlag = ctx.state?.autoSaveFlag !== undefined ? ctx.state.autoSaveFlag : true;
      }

      //检查参数
      this.checkModel(
        {
          model: account
        },
        {
          ctx
        }
      );

      logger.debug('username:', username);
      DobUtilApi.checkValue(
        {
          value: username
        },
        {
          type: AccountConstant.PROP_USERNAME_TYPE,
          rule: {
            ...AccountConstant.PROP_USERNAME_RULE,
            allowUndefined: true
          }
        }
      );

      logger.debug('password:', password);
      DobUtilApi.checkValue(
        {
          value: password
        },
        {
          type: AccountConstant.PROP_PASSWORD_TYPE,
          rule: {
            ...AccountConstant.PROP_PASSWORD_RULE,
            allowUndefined: true
          }
        }
      );

      logger.debug('tokenA:', tokenA);
      DobUtilApi.checkValue(
        {
          value: tokenA
        },
        {
          type: AccountConstant.PROP_TOKEN_TYPE,
          rule: {
            ...AccountConstant.PROP_TOKEN_RULE,
            allowUndefined: true
          }
        }
      );

      logger.debug('autoSaveFlag:', autoSaveFlag);
      DobUtilApi.checkValue(
        {
          value: autoSaveFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN
        }
      );

      logger.debug('throwErrorFlag:', throwErrorFlag);
      DobUtilApi.checkValue(
        {
          value: throwErrorFlag
        },
        {
          type: DobUtilConstant.VALUE_TYPE_BOOLEAN
        }
      );

      //更新
      if (username !== undefined) {
        account.username = username;
      }

      if (password !== undefined) {
        account.password = password;
      }

      if (tokenA !== undefined) {
        account.tokenA = tokenA;
      }

      //保存
      if (autoSaveFlag === true) {
        await account.save(
          {
            transaction
          }
        );
      }

      //返回
      return true;
    }
    catch (error) {
      //抛出错误
      if (throwErrorFlag === true) {
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


  /**
   * @description 验证密码
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {AccountModel} param1.account 账号
   * @param {Object} param2
   * @param {String} param2.password 密码
   * @param {Object} param3
   * @param {Boolean} [param3.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param3.ctx 上下文
   * 
   * @returns {Boolean}
   */
  static verifyPassword(
    {
      account
    },
    {
      password
    },
    {
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmAccountController::verifyPassword';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);
    
    try {
      //检查参数
      this.checkModel(
        {
          model: account
        },
        {
          ctx
        }
      );

      logger.debug('password:', password);
      DobUtilApi.checkValue(
        {
          value: password
        },
        {
          type: AccountConstant.PROP_PASSWORD_TYPE,
          rule: {
            ...AccountConstant.PROP_PASSWORD_RULE
          }
        },
        {
          ctx
        }
      );

      //验证密码
      if (account.password !== password) {
        throw new AccountError(AccountError.ACCOUNT_PASSWORD_MISSMATCH);
      }

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
        logger.error(error);
        return false;
      }
    }
    finally {
      //结束执行
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 加密密码
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {String} param1.password 密码
   * @param {Object} param2
   * @param {Boolean} [param2.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param2.ctx 上下文
   * 
   * @returns {String}
   */
  static encryptPassword(
    {
      password
    },
    {
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmAccountController::encryptPassword';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);
    
    try {
      //检查参数
      logger.debug('password:', password);
      DobUtilApi.checkValue(
        {
          value: password
        },
        {
          type: AccountConstant.PROP_PASSWORD_TYPE,
          rule: {
            ...DobUtilConstant.VALUE_RULE_NONEMPTY_STRING
          }
        },
        {
          ctx
        }
      );

      //加密密码
      let hash = crypto.createHash('sha256');
      hash.update(password);
      return hash.digest('hex');
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
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }


  /**
   * @description 验证Token
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {AccountModel} param1.account 账号
   * @param {Object} param2
   * @param {String} param2.type 类型
   * @param {String} param2.token Token
   * @param {Object} param3
   * @param {Boolean} [param3.throwErrorFlag=true] 抛出错误标志
   * @param {Object} param3.ctx 上下文
   * 
   * @returns {Boolean}
   */
  static verifyToken(
    {
      account
    },
    {
      type,
      token
    },
    {
      throwErrorFlag = true,
      ctx
    }
  ) {
    const identifier = 'DmmAccountController::verifyToken';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);
    
    try {
      //检查参数
      this.checkModel(
        {
          model: account
        },
        {
          ctx
        }
      );

      logger.debug('type:', type);
      DobUtilApi.checkValue(
        {
          value: type
        },
        {
          type: DobUtilConstant.VALUE_TYPE_NUMBER,
          rule: {
            gte: 1,
            lte: 1
          }
        },
        {
          ctx
        }
      );

      logger.debug('token:', token);
      DobUtilApi.checkValue(
        {
          value: token
        },
        {
          type: AccountConstant.PROP_TOKEN_TYPE,
          rule: {
            ...AccountConstant.PROP_TOKEN_RULE
          }
        },
        {
          ctx
        }
      );

      //验证Token
      if (account.token === '') {
        throw new AccountError(AccountError.ACCOUNT_TOKEN_MISMATCH);
      }

      switch (type) {
        case 1:
          if (account.tokenA !== token) {
            throw new AccountError(AccountError.ACCOUNT_TOKEN_MISMATCH);
          }
          break;
      }
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



  /**
   * @description 生成Token
   * 
   * @static
   * 
   * @param {Object} param1
   * @param {Boolean} [param1.throwErrorFlag = true] 抛出错误标志
   * @param {Object} param1.ctx 上下文
   * 
   * @returns {String}
   */
  static generateToken(
    {
      throwErrorFlag = true,
      ctx
    } = {}
  ) {
    const identifier = 'DmmAccountController::generateToken';
    
    //获取日志器
    const logger = DobLogApi.getLogger(
      {
        category: identifier
      }
    );
    
    //开始执行
    logger.debug(`=====开始执行${identifier}=====`);
    
    try {
      return DobUtilApi.generateRandomString(
        {
          length: 32,
        }
      );
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
      logger.debug(`=====结束执行${identifier}=====`);
    }
  }
}

module.exports = AccountController;