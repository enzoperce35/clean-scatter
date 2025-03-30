class Fund {
  constructor(initialFund) {
    this.fund = initialFund;  // the base fund
    this.newFund = initialFund;  // must be greater than or equal to fund, else: rebound
    this.initialFund = initialFund;  // the initial fund input
    this.newHigh = initialFund;  // highest fund reached
    this.change = null;  // change percentage every spin
    this.profit = null;  // difference between initial and newfund in percentage
    this.targetProfit = this.newTargetProfit(1);
  }

  newTargetProfit(inputNumber) {
    let iterations = Math.floor(inputNumber / 10); // Determine how many times to loop
    let accumulatedNumber = 0;
    
    for (let i = 0; i < iterations; i++) {
        let randomMultiplier = Math.random() * (4.5 - 3) + 3; // Generate a random number between 1.3 and 1.8
        accumulatedNumber += randomMultiplier;
    }
    
    return inputNumber+accumulatedNumber;
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
      this.change = ((newFund - this.newFund) / this.newHigh) * 100;
      this.profit = ((newFund - this.initialFund) / this.initialFund) * 100
      this.newFund = newFund;
     
      
      if (this.profit >= this.targetProfit) {
        this.targetProfit = this.newTargetProfit(this.profit)
        this.setFund(this.newFund);
      }
      
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
    return this.change === null ||
           this.change >= 30 ||
           this.fund === this.newHigh
  }
}

export default Fund;
