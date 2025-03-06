import { useState, useEffect } from "react";

export default function Scatter({ fund }) {
  const [fundUpdated, setFundUpdated] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const bets = [0.5, 1, 2, 3, 5, 10, 20, 30, 40, 50, 80, 100, 200, 500, 1000];
  const spins = fund.hasSignificantIncrease() && fund.isIncreasing() ? 14 : 25;
  const [textEffect, setTextEffect] = useState(false);

  const calculateBet = () => {
    const play = (test = false) => { console.log(`to test: ${test}`)
      const playable = (fund.fund / (test ? 5 : 2)) / 25;
      return bets.filter((bet) => bet <= playable).pop() || bets[0]; // Get the closest smaller bet
    };

    const rebound = () => { console.log(`to rebound`)
      const playable = (fund.fund - fund.newFund) / 100;
      const reboundBet = bets.find((bet) => bet >= playable) || null; // Get the closest higher bet
      return reboundBet;
    };

    return fund.isIncreasing() ? play(fund.hasSignificantIncrease()) : rebound();
  };

  const [bet, setBet] = useState(() => calculateBet());

  useEffect(() => {
    const newBet = calculateBet();
    const overTheSafeLine = (fund.newFund - (newBet * spins)) < fund.fund / 2
    const suspiciousDecline = fund.decrease >= 500 && fund.newFund <= fund.fund * 0.75;

    setBet(newBet);

    if (!fund.isIncreasing() && newBet && (overTheSafeLine || suspiciousDecline)) {
      setEndGame((prev) => prev || true);
    }
  }, [fund.fund, fund.newFund]);

  function handleSubmit(e) {
    e.preventDefault();

    const newFund = parseInt(new FormData(e.target).get("new-fund"), 10);

    if (!isNaN(newFund)) {
      fund.setNewFund(newFund);
      setFundUpdated((prev) => !prev);
    }

    setTextEffect(false);
    setTimeout(() => setTextEffect(true), 10);
  }

  return (
    <div>
      <h1 className={textEffect ? "appear-active" : ""}>{endGame ? "No More Spins: This Is Not Going To Be Good!" : `Spin ${spins} times on Bet ${bet}`}</h1>

      <div className={endGame ? 'hidden' : ''}>
        <form id="spin-result" onSubmit={handleSubmit}>
          <div>
            <div className="result-form">
              <input
                type="number"
                step="any"
                name="new-fund"
                placeholder="Put The Result Here"
                required
              />
            </div>
          </div>

          <div id="submit">
            <input type="submit" value="Submit" disabled={endGame} />
          </div>
        </form>
      </div>

      <h1 id="dev-text">{`${parseInt(fund.decrease, 10)}/500`}</h1>
    </div>
  );
}
