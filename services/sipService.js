const calculateSipAmount = (sip, income, expenses, currentAge, selectedGoals, goalsDetails) => {
  const yearlyReturnRate = 0.12; // 12% annual return
  const monthlyReturnRate = yearlyReturnRate / 12;

  const yearsToRetirement = goalsDetails.retirementAge - currentAge;
  if (yearsToRetirement <= 0) {
    throw new Error('Retirement age must be greater than current age.');
  }

  // Calculate retirement expenses (from retirement age to 100)
  const annualExpense = expenses * 5;
  const yearsOfRetirement = 100 - goalsDetails.retirementAge;
  const retirementExpenses = annualExpense * yearsOfRetirement;

  // Calculate goal-specific amounts
  const { kids, houseType } = goalsDetails;

  const educationCost = kids ? Number(kids) * 10000000 : 0; // ₹1 crore per child
  const homeCost =
    houseType === 'Luxurious'
      ? 30000000
      : houseType === '2BHK'
      ? 5000000
      : houseType === '2 Floored'
      ? 10000000
      : 0; // Default to ₹0 if no house type is selected
  const emergencyFund = 1000000; // ₹10 lakhs for emergencies

  // Total required amount
  const totalRequiredAmount = retirementExpenses + educationCost + homeCost + emergencyFund;
  const totalMonths = yearsToRetirement * 12;
  const futureValueOfCurrentSip =
  sip * ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate);


  // Remaining amount needed
  const remainingAmount = totalRequiredAmount - futureValueOfCurrentSip;
  // Monthly SIP calculation using Future Value (FV) formula:
  // FV = SIP * [((1 + r)^n - 1) / r]
  // SIP = FV / [((1 + r)^n - 1) / r]
  console.log(futureValueOfCurrentSip,totalRequiredAmount,remainingAmount)
  const monthlySipNeeded =
  remainingAmount /
    ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate);

  return {futureValueOfCurrentSip: futureValueOfCurrentSip, remainingAmount: Math.max(0,remainingAmount), monthlySipNeeded: Math.max(0,monthlySipNeeded)}; // Use the maximum of the current SIP or calculated SIP
};

module.exports = {
  calculateSipAmount,
};
