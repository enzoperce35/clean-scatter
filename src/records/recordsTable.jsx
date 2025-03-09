import React from "react";
import "../RecordsTable.css";

export default function RecordsTable({ records }) {
  const hasReason = records.some((record) => record.reason);

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
    <th>End Cause</th>
  </tr>
</thead>
<tbody>
  {records.toReversed().map((record, index) => (
    <tr key={index} className={index % 2 === 0 ? "even-row" : "odd-row"}>
      <td data-label="Spins">{record.spins}</td>
      <td data-label="Bet">{record.bet}</td>
      <td data-label="result" className="new-fund">{record.newFund}</td>
      <td data-label="previous">{record.fund}</td>
      <td data-label="highest" className="new-high">{record.newHigh}</td>
      <td data-label="Change">{parseInt(record.change, 10)}</td>
      {hasReason && <td data-label="end cause">{record.reason || "-"}</td>}
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}
