import React from "react";
import "./balance.css";

const Balance = (props) => {
  const { totalIncome, totalSpend, balance } = props;
  return (
    <div className='balance-content'>
      <label>Balance</label>
      <h1>{balance} CZK</h1>
      <div className='total-view'>
        <span>Income: {totalIncome} Kc</span>
        <span>Spendings: {totalSpend} Kc</span>
      </div>
    </div>
  );
};

export default Balance;
