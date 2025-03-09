export function createRecord({ bet, spins }) {
  return {
    bet,
    spins,
    fund: null,
    change: null,
    newFund: null,
    newHigh: null,
  };
}

export function updateRecord(record, fund) {
  return {
    ...record,
    fund: fund.fund,
    change: fund.change,
    newFund: fund.newFund,
    newHigh: fund.newHigh,
    reason: fund.reason || null, // Store reason if endGame is true
  };
}

