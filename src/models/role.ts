import { DataTypes, Sequelize } from 'sequelize';

const RoleModel = (sequelize: Sequelize) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  }, {
    tableName: 'roles',
  });

  return Role;
};

module.exports = RoleModel;