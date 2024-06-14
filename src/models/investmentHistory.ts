import { DataTypes, Sequelize } from 'sequelize';

const InvestmentHistoryModel = (sequelize: Sequelize) => {
  const InvestmentHistory = sequelize.define('InvestmentHistory', {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    investmentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    maturedAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.fn('now'),
    },
  }, {
    tableName: 'investment_histories',
  });

  return InvestmentHistory;
};

module.exports = InvestmentHistoryModel;