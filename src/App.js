import React, { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import IncomeModal from "./components/IncomeModal";
import SpendModal from "./components/SpendModal";
import Balance from "./components/Balance";
import Items from "./components/Items";
import "./App.css";

function App(props) {
  // Income Modal
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const openIncomeHandler = () => setShowIncomeModal(true);
  const closeModal = () => setShowIncomeModal(false);

  // Spend Modal
  const [showSpendingModal, setShowSpendingModal] = useState(false);
  const openSpendingHandler = () => setShowSpendingModal(true);
  const closeSpendingModal = () => setShowSpendingModal(false);

  // incomeData initial
  let incomeData = [];
  if (localStorage.getItem("income")) {
    incomeData = JSON.parse(localStorage.getItem("income"));
  } else {
    incomeData = [{ id: "", date: "", income: "", description: "" }];
  }

  // spendData initial
  let spendData = [];
  if (localStorage.getItem("spend")) {
    spendData = JSON.parse(localStorage.getItem("spend"));
  } else {
    spendData = [{ id: "", date: "", spend: "", description: "" }];
  }

  // Total Income
  let totalIncome = 0;
  incomeData.forEach(({ income }) => {
    if (income) {
      totalIncome += parseInt(income);
    }
  });

  // Total Spend
  let totalSpend = 0;
  spendData.forEach(({ spend }) => {
    if (spend) {
      totalSpend += parseInt(spend);
    }
  });

  // Balance
  const balance = totalIncome - totalSpend;

  // total list items
  const totalList = incomeData.concat(spendData);

  //Delete item
  const deleteItemHandler = (id) => {
    return totalList.filter((element) => element !== id);
  };

  return (
    <>
      <IncomeModal openModal={showIncomeModal} closeModal={closeModal} />
      <SpendModal
        openModal={showSpendingModal}
        closeModal={closeSpendingModal}
      />
      <div className='expense-planner-wrapper'>
        <div className='expense-planner'>
          <Balance
            totalIncome={totalIncome}
            totalSpend={totalSpend}
            balance={balance}
          />
          <ul>
            {totalList.map((item) => {
              return (
                item.id !== "" && (
                  <Items
                    key={item.id}
                    id={item.id}
                    date={item.date}
                    income={item.income}
                    spend={item.spend}
                    description={item.description}
                    className={item.className}
                    removeItem={deleteItemHandler}
                  />
                )
              );
            })}
          </ul>
        </div>
        <div className='input-button'>
          <span className='income' onClick={openIncomeHandler}>
            Add Income
          </span>
          <span className='spend' onClick={openSpendingHandler}>
            Add Spending
          </span>
        </div>
      </div>
    </>
  );
}

export default App;
