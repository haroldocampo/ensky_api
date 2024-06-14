import { DataTypes, Sequelize } from 'sequelize';

const InvestmentModel = (sequelize: Sequelize) => {
    const Investment = sequelize.define('Investment', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
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
            defaultValue: 0,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('now'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.fn('now'),
        },
    }, { 
        tableName: 'investments', 
    });

    return Investment;
};

module.exports = InvestmentModel;