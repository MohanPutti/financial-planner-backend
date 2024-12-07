const sipService = require('../services/sipService');

const calculateSip = (req, res) => {
  try {
    const { basicDetails, goals, financialDetails } = req.body;

    // Input validation
    if (!basicDetails || !goals || !financialDetails) {
      return res.status(400).json({ error: 'Missing required data in the request.' });
    }

    const { name, email, mobile, age } = basicDetails;
    const { selectedGoals, details } = goals;
    const { sip, income, expenses } = financialDetails;

    if (
      typeof sip !== 'number' ||
      typeof income !== 'number' ||
      typeof expenses !== 'number' ||
      !Array.isArray(selectedGoals) ||
      !name ||
      !email ||
      !mobile ||
      !age
    ) {
      return res.status(400).json({ error: 'Invalid input. Please provide valid details.' });
    }

    // Calculate recommended SIP using the service
    const result = sipService.calculateSipAmount(sip, income, expenses,age, selectedGoals,details);

    // Construct response
    const response = {
      name,
      email,
      mobile,
      age,
      selectedGoals,
      goalDetails: details,
      financialSummary: {
        sip,
        income,
        expenses,
      },
      recommendedSip: result.monthlySipNeeded,
      remainingAmount: result.remainingAmount,
      currentSipFutureValue: result.futureValueOfCurrentSip
    };

    res.json(response);
  } catch (error) {
    console.error('Error processing SIP calculation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  calculateSip,
};
