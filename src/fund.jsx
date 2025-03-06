class Fund {
  constructor() {
    this.fund = this.getFund();
    this.newFund = this.fund;
    this.newHigh = 0;
    this.increase = null;
    this.decrease = 0;
  }

  setFund(value) {
    const fundValue = parseInt(value, 10);
    if (!isNaN(fundValue)) {
      this.fund = fundValue;
      this.newFund = fundValue;
      this.newHigh = fundValue;
      this.decrease = 0;
    }
  }

  setNewFund(value) {
    const newFund = parseInt(value, 10);
    
    if (!isNaN(newFund)) {
      // Calculate percentage change between newHigh and newFund
      let change = ((newFund - this.newFund) / this.newFund) * 100;

      if (change < 0) {
        this.decrease += Math.abs(change);
        this.increase = 0;
      } else {
        this.increase = change;
      }

      this.newFund = newFund;
      
      // Automatically update this.fund if newFund is at least 50% higher than this.fund
      if (this.newFund >= 1.5 * this.fund) {
        this.setFund(this.newFund);
      }
      else if (this.newFund >= this.newHigh) {
        this.newHigh = this.newFund;
      }
    }
  }

  getFund() {
    return parseInt(sessionStorage.getItem("fund"), 10) || 0;
  }

  isIncreasing() {
    return this.newFund >= this.fund
  }

  hasSignificantIncrease() {
    return this.increase === null || this.increase >= 30;
  }
}

export default Fund;
