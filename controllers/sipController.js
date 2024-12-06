const sipService = require('../services/sipService');

const calculateSip = (req, res) => {
  try {
    const { sip, income, expenses } = req.body;

    // Input validation
    if (typeof sip !== 'number' || typeof income !== 'number' || typeof expenses !== 'number') {
      return res.status(400).json({ error: 'Invalid input. Please provide numbers for SIP, income, and expenses.' });
    }

    // Business logic handled by service
    const recommendedSip = sipService.calculateSipAmount(sip, income, expenses);

    res.json({
      recommendedSip,
      message: 'Personalized SIP amount calculated successfully!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  calculateSip,
};
