import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import Modal from "../components/shared/Modal";
// import { useForm } from "../components/shared/form-hook";

const IncomeModal = (props) => {
  const { openModal, closeModal, updateLocalStorage } = props;

  //Date
  const [startDate, setStartDate] = useState(new Date());
  const dateChangeHandler = (date) => {
    setStartDate(date);
  };

  let currentDate = startDate;
  let onlyDate = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  const selectedDate = onlyDate + "." + (month + 1) + "." + year;

  // Income
  const [income, setIncome] = useState("");
  const incomeChangeHandler = (event) => {
    const { value } = event.target;
    setIncome(value);
  };

  // Description
  const [description, setDescription] = useState("");
  const descriptionChangeHandler = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const [incomes, setIncomes] = useState([
    {
      id: "",
      date: "",
      income: "",
      description: "",
    },
  ]);

  useEffect(() => {
    const data = localStorage.getItem("income");
    if (data) {
      setIncomes(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(incomes));
  });

  const addIncomeHandler = (event) => {
    event.preventDefault();
    closeModal();
    setIncomes([
      {
        id: `${Math.floor(Math.random() * 1000000000000)}`,
        date: selectedDate,
        income: income,
        className: "income",
        description: description,
      },
      ...incomes,
    ]);
    updateLocalStorage();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateLocalStorage();
  };

  return (
    <Modal
      show={openModal}
      headerClass='income'
      header='Add Income'
      onSubmit={handleSubmit}
      contentClass='form-control'
      children={
        <>
          <label>Date</label>
          <DatePicker
            name='date'
            selected={startDate}
            onChange={dateChangeHandler}
            value={selectedDate}
          />
          <label>Income</label>
          <input
            name='income'
            type='number'
            maxLength='6'
            minLength='0'
            placeholder='Your Income'
            onChange={incomeChangeHandler}
            value={income}
          />

          <label>Description</label>
          <textarea
            name='description'
            placeholder='Your Description'
            onChange={descriptionChangeHandler}
            value={description}
          />
        </>
      }
      footerClass='place-item__modal-actions'
      footer={
        <>
          <button
            className='okIncomeButton'
            type='submit'
            onClick={addIncomeHandler}
          >
            Add
          </button>
          <button className='cancelButton' onClick={closeModal}>
            Cancel
          </button>
        </>
      }
    />
  );
};

export default IncomeModal;
