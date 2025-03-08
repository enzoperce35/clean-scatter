export function createRecord({ bet, spins }) {
  return {
    bet,
    spins,
    fund: null,
    change: null,
    newFund: null,
    newHigh: null,
    isIncreasing: null,
    hasSignificantIncrease: null,
  };
}

export function updateRecord(record, fund) {
  return {
    ...record,
    fund: fund.fund,
    change: fund.change,
    newFund: fund.newFund,
    newHigh: fund.newHigh,
    isIncreasing: fund.isIncreasing(),
    hasSignificantIncrease: fund.hasSignificantIncrease(),
  };
}
