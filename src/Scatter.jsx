import { useState, useEffect, useRef } from "react";
import RecordsTable from "./records/recordsTable";
import { CircleDollarSign, Table } from "lucide-react";
import { createRecord, updateRecord } from "./records/records";

export default function Scatter({ fund }) {
  const inputRef = useRef(null);
  const [bet, setBet] = useState(0);
  const [records, setRecords] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [textEffect, setTextEffect] = useState(false);
  const [fundUpdated, setFundUpdated] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const initialFund = parseInt(sessionStorage.getItem('initialFund'));
  const bets = [0.5, 1, 2, 3, 5, 10, 20, 30, 40, 50, 80, 100, 200, 500, 1000];
  const spins = fund.hasSignificantIncrease() && fund.isIncreasing() ? 14 : 25;

  useEffect(() => {
    const newBet = calculateBet();
    setBet(newBet);

    const suspiciousDecline = sumNegativeChanges() >= 25 && fund.newFund < fund.fund * 0.80;
    const overTheSafeLine = (fund.newFund - newBet * spins) < ((fund.newHigh / 2) + (0.40 * (fund.newHigh - initialFund)));
    
    if (!fund.isIncreasing() && newBet && (overTheSafeLine || suspiciousDecline)) {
      setEndGame(true);
    }
  }, [fund.fund, fund.newFund]);

  useEffect(() => {
    if (records.length > 0) {
      setRecords((prev) => {
        const updatedRecord = [...prev];
        updatedRecord[updatedRecord.length - 1] = updateRecord(updatedRecord[updatedRecord.length - 1], fund);
        return updatedRecord;
      });
    }
  }, [fundUpdated]);

  function handleSubmit(e) {
    e.preventDefault();
    const newFund = parseFloat(new FormData(e.target).get("new-fund"));

    if (!isNaN(newFund)) {
      fund.setNewFund(newFund);
      setFundUpdated((prev) => !prev);
      setRecords((prev) => [...prev, createRecord({ bet, spins })]);
    }

    setTextEffect(false);
    setTimeout(() => setTextEffect(true), 10);

    e.target.reset();
    inputRef.current?.focus();
  }

  const sumNegativeChanges = () =>
    records.reduce((total, record) => total + (record.change < 0 ? Math.abs(record.change) : 0), 0);
  
  const calculateBet = () => {
    const play = (test = false) => {
      const playable = (fund.fund / (test ? 5 : 2)) / 25;
      return bets.filter((bet) => bet <= playable).pop() || bets[0];
    };
    
    const rebound = () => {
      const playable = (fund.fund - fund.newFund) / 100;
      return bets.find((bet) => bet >= playable) || null;
    };

    return fund.isIncreasing() ? play(fund.hasSignificantIncrease()) : rebound();
  };

  return (
    <div className="scatter-container">
      <button className="records-toggle" onClick={() => setShowRecords(!showRecords)}>
        {showRecords ? <CircleDollarSign size={24} /> : <Table size={24} />}
      </button>

      {showRecords ? (
        <div className="records-table">
          <RecordsTable records={records} />
        </div>
      ) : (
        <div className="gameplay-container">
          <h1 className={textEffect ? "appear-active" : ""}>
            {endGame ? "No More Spins: This Is Not Going To Be Good!" : `Spin ${spins} times on Bet ${bet}`}
          </h1>
          {!endGame && (
            <form id="spin-result" onSubmit={handleSubmit} className="result-form">
              <input ref={inputRef} type="number" step="any" name="new-fund" placeholder="Put The Result Here" required />
              <button type="submit" id="scatter-submit" disabled={endGame}>Submit</button>
            </form>
          )}
          <h1 className="hidden">{`${parseInt(sumNegativeChanges(), 10)}/25`}</h1>
        </div>
      )}
    </div>
  );
}
