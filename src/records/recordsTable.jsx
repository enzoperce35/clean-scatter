import React from "react";
import "../RecordsTable.css";

export default function RecordsTable({ records }) {
  return (
    <div className="table-container">
      <table className="records-table">
        <thead>
          <tr>
            <th>Bet</th>
            <th>Spins</th>
            <th>Fund</th>
            <th>Change</th>
            <th>New Fund</th>
            <th>New High</th>
            <th>Increasing</th>
            <th>Significant Increase</th>
          </tr>
        </thead>
        <tbody>
          {records.toReversed().map((record, index) => (
            <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
              <td data-label="Bet">{record.bet}</td>
              <td data-label="Spins">{record.spins}</td>
              <td data-label="Fund">{record.fund}</td>
              <td data-label="Change">{parseInt(record.change, 10)}</td>
              <td data-label="New Fund" className="new-fund">{record.newFund}</td>
              <td data-label="New High" className="new-high">{record.newHigh}</td>
              <td data-label="Increasing" className={record.isIncreasing ? "increasing" : "decreasing"}>
                {record.isIncreasing ? "Yes" : "No"}
              </td>
              <td data-label="Significant Increase" className={record.hasSignificantIncrease ? "significant-increase" : "no-increase"}>
                {record.hasSignificantIncrease ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
