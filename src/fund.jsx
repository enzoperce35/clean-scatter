class Fund {
  constructor() {
    this.fund = this.getFund();
    this.newFund = this.fund;
  }

  setFund(value) {
    const fundValue = parseInt(value, 10);
    if (!isNaN(fundValue)) {
      sessionStorage.setItem("fund", fundValue);
      this.fund = fundValue;
    }
  }

  setNewFund(value) {
    const newFund = parseInt(value, 10);
    
    if (!isNaN(newFund)) {
      this.newFund = newFund;
      
      // Automatically update this.fund if newFund is at least double the original fund
      if (this.newFund >= 2 * this.fund) {
        this.setFund(this.newFund);
      }
    }
  }

  getFund() {
    return parseInt(sessionStorage.getItem("fund"), 10) || 0;
  }

  isIncreasing() {
    return this.newFund >= this.fund
  }

  updated() {
    return this.fund === this.newFund
  }
}

export default Fund;
