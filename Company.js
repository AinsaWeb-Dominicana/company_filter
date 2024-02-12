/**
 * Loopback CompanyFilter
 *
 * To implement, add "Company": true in mixins section on YourModel.json file
 *
 * To run queries that include deleted items in the response,
 * add { isDeleted: true } to the query object (at the same level as where, include etc).
 */

module.exports = function (Model, options) {

  Model.defineProperty('companyId', {
      type: Number,
      required: true,
      mysql: {
          columnName: "company_id",
          dataType: "bigint",
          dataLength: null,
          dataPrecision: 19,
          dataScale: 0,
          nullable: "Y"
      }
  });

  /**
   * Watches destroyAll(), deleteAll(), destroyById() , deleteById(), prototype.destroy(), prototype.delete() methods
   * and instead of deleting object, sets properties deletedAt and isDeleted.
   */
  Model.observe('before save', function (ctx, next) {
    let companyId = '1';
  //   console.log(Model.app.get('headers'));
  //   console.log(Model.app.get('headers').company);
  if(Model.app.get('headers') != undefined && Model.app.get('headers').company != undefined) {
      companyId = Model.app.get('headers').company;
  }
  //   companyId = Model.app.get('headers').company;
    if(ctx.instance) {
      ctx.instance.companyId = Number(companyId);
    }
    if(ctx.currentInstance) {
      console.log('IS for update');
    }
    next();
    // Model.updateAll(ctx.where, {deletedAt: new Date(), isDeleted: true}).then(function (result) {
      //     next(null);
      // });
  });
  Model.observe('before execute', function(ctx, next) {
    let sql = ctx.req.sql;
    if(sql.include('`company_id`=?')) {
      console.log('INCLUDE COMPANYID')
    }
    console.log(sql);
    console.log('INCLUDE COMPANYID OUTSIDE ID')
    app.emit(sql);
    next();
  });
Model.observe('before findById', function(ctx, next) {
  let sql = ctx.req.sql;
  if(sql.include('`company_id`=?')) {
    console.log('INCLUDE COMPANYID')
  }
  console.log(sql);
  console.log('INCLUDE COMPANYID OUTSIDE ID')
  app.emit(sql);
  next();
});

Model.observe('access', function logQuery(ctx, next) {
    let companyId = '1';
  //   console.log(Model.app.get('headers'));
  //   console.log(Model.app.get('headers').company);
      if(Model.app.get('headers') != undefined && Model.app.get('headers').company != undefined) {
          companyId = Model.app.get('headers').company;
      }
    console.log('===========COMPANY ID============');
      console.log(companyId);
    console.log('===========COMPANY ID============');
    if((ctx.query.companyId != undefined && ctx.query.companyId > 0) && (!ctx.query.where || ctx.query.where || JSON.stringify(ctx.query.where).indexOf('companyId') != -1)) {
          console.log("comparando con valor 0");
          if (!ctx.query.where) ctx.query.where = {};
          ctx.query.where.companyId = Number(ctx.query.companyId);
      }  else if((companyId != undefined && Number(companyId) > 0)) {
        console.log("comparando con header");
        if (!ctx.query.where) ctx.query.where = {};
        // console.log(loopback.getCurrentContext());
      console.log(ctx.Model.modelName);
      // console.log(ctx.Model.dataSource);
      console.log('======================');
        ctx.query.where.companyId = Number(companyId);
      console.log(ctx.query.where);
      // console.log(ctx);
    } else if (!(ctx.query.companyId != undefined && ctx.query.companyId > 0) && (!ctx.query.where || ctx.query.where && JSON.stringify(ctx.query.where).indexOf('companyId') == -1)) {
        console.log("comparando con valor undefined o 0");
        if (!ctx.query.where) ctx.query.where = {};
        ctx.query.where.companyId = 0;
      }
    // let sql = ctx.req.sql;
    // if(sql.include('`company_id`=?')) {
    //   console.log('INCLUDE COMPANYID')
    // }
    // console.log(sql);
    // console.log('INCLUDE COMPANYID OUTSIDE ID')
    next();
  });
};
