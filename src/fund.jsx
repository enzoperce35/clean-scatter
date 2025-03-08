class Fund {
  constructor() {
    this.fund = null;
    this.newFund = this.fund;
    this.newHigh = 0;
    this.change = null;
  }

  setFund(value) {
    const fundValue = parseInt(value, 10);
    if (!isNaN(fundValue)) {
      this.fund = fundValue;
      this.newFund = fundValue;
      this.newHigh = fundValue;
    }
  }

  setNewFund(value) {
    const newFund = parseInt(value, 10);
    
    if (!isNaN(newFund)) {
      this.change = ((newFund - this.newFund) / this.newFund) * 100;
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

  isIncreasing() {
    return this.newFund >= this.fund
  }

  hasSignificantIncrease() {
    return this.change === null || this.change >= 30
  }
}

export default Fund;
