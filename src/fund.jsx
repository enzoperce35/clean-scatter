class Fund {
  constructor() {
    this.fund = this.getFund();
    this.newFund = this.fund;
    this.newHigh = 0;
    this.increase = null;
  }

  setFund(value) {
    const fundValue = parseInt(value, 10);
    if (!isNaN(fundValue)) {
      this.fund = fundValue;
      this.newHigh = fundValue;
    }
  }

  setNewFund(value) {
    const newFund = parseInt(value, 10);
    
    if (!isNaN(newFund)) {
      // Calculate percentage change between newHigh and newFund
      this.increase = ((newFund - this.newFund) / this.newFund) * 100;

      this.newFund = newFund;
      
      // Automatically update this.fund if newFund is at least double the original fund
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
