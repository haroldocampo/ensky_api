const db = require('../db');
const cron = require('node-cron');

const { Investment, InvestmentHistory } = db;
const INVESTMENT_MULTIPLIER = parseFloat(process.env.INVESTMENT_MULTIPLIER || '1.05');
export const updateInvestments = async () => {
  try {
    const investments = await Investment.findAll();
    for (const investment of investments) {
      const maturedAmount = investment.amount * INVESTMENT_MULTIPLIER;
      investment.maturedAmount = maturedAmount;
      await investment.save();

      // Create investment history record
      await InvestmentHistory.create({
        investmentId: investment.id,
        amount: investment.amount,
        maturedAmount: maturedAmount,
      });
    }
    console.log('Investments updated successfully');
  } catch (error) {
    console.error('Error updating investments:', error);
  }
};

// Schedule this job to run monthly
cron.schedule('0 0 1 * *', updateInvestments);