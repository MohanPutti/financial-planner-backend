const calculateSipAmount = (sip, income, expenses) => {
    const savings = income - expenses;
  
    // Calculate recommended SIP (business logic)
    return Math.max(savings * 0.2, sip);
  };
  
  module.exports = {
    calculateSipAmount,
  };
  