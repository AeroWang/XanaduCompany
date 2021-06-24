var DataTypes = require("sequelize").DataTypes;
var _aw_dept = require("../models/aw_dept");
var _aw_dept_user = require("../models/aw_dept_user");
var _aw_permission = require("../models/aw_permission");
var _aw_permission_api = require("../models/aw_permission_api");
var _aw_role = require("../models/aw_role");
var _aw_role_permission = require("../models/aw_role_permission");
var _aw_user = require("../models/aw_user");
var _aw_user_role = require("../models/aw_user_role");
var _operation_log = require("../models/operation_log");

function initModels(sequelize) {
  var aw_dept = _aw_dept(sequelize, DataTypes);
  var aw_dept_user = _aw_dept_user(sequelize, DataTypes);
  var aw_permission = _aw_permission(sequelize, DataTypes);
  var aw_permission_api = _aw_permission_api(sequelize, DataTypes);
  var aw_role = _aw_role(sequelize, DataTypes);
  var aw_role_permission = _aw_role_permission(sequelize, DataTypes);
  var aw_user = _aw_user(sequelize, DataTypes);
  var aw_user_role = _aw_user_role(sequelize, DataTypes);
  var operation_log = _operation_log(sequelize, DataTypes);

  aw_dept_user.belongsTo(aw_dept, { as: "dept", foreignKey: "dept_id"});
  aw_dept.hasMany(aw_dept_user, { as: "aw_dept_users", foreignKey: "dept_id"});
  aw_permission_api.belongsTo(aw_permission, { as: "p", foreignKey: "ps_id"});
  aw_permission.hasMany(aw_permission_api, { as: "aw_permission_apis", foreignKey: "ps_id"});
  aw_role_permission.belongsTo(aw_permission, { as: "p", foreignKey: "ps_id"});
  aw_permission.hasMany(aw_role_permission, { as: "aw_role_permissions", foreignKey: "ps_id"});
  aw_role_permission.belongsTo(aw_role, { as: "role", foreignKey: "role_id"});
  aw_role.hasMany(aw_role_permission, { as: "aw_role_permissions", foreignKey: "role_id"});
  aw_user_role.belongsTo(aw_role, { as: "role", foreignKey: "role_id"});
  aw_role.hasMany(aw_user_role, { as: "aw_user_roles", foreignKey: "role_id"});
  aw_dept_user.belongsTo(aw_user, { as: "user", foreignKey: "user_id"});
  aw_user.hasMany(aw_dept_user, { as: "aw_dept_users", foreignKey: "user_id"});
  aw_user_role.belongsTo(aw_user, { as: "user", foreignKey: "user_id"});
  aw_user.hasMany(aw_user_role, { as: "aw_user_roles", foreignKey: "user_id"});

  return {
    aw_dept,
    aw_dept_user,
    aw_permission,
    aw_permission_api,
    aw_role,
    aw_role_permission,
    aw_user,
    aw_user_role,
    operation_log,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
