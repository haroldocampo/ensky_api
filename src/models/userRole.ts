import { DataTypes, Sequelize } from 'sequelize';

const UserRoleModel = (sequelize: Sequelize) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    tableName: 'user_roles',
  });

  return UserRole;
};

module.exports = UserRoleModel;