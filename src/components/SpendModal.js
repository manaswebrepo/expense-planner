import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import Modal from "./shared/Modal";
// import { useForm } from "../components/shared/form-hook";

const SpendModal = (props) => {
  const { openModal, closeModal } = props;

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

  // Spend
  const [spend, setSpend] = useState("");
  const spendChangeHandler = (event) => {
    const { value } = event.target;
    setSpend(value);
  };

  // Description
  const [description, setDescription] = useState("");
  const descriptionChangeHandler = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  const [spends, setSpends] = useState([
    {
      id: "",
      date: "",
      spend: "",
      description: "",
    },
  ]);

  useEffect(() => {
    const data = localStorage.getItem("spend");
    if (data) {
      setSpends(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("spend", JSON.stringify(spends));
  });

  const addSpendingHandler = (event) => {
    event.preventDefault();
    closeModal();
    setSpends([
      {
        id: `${Math.floor(Math.random() * 1000000000111)}`,
        date: selectedDate,
        spend: spend,
        className: "spend",
        description: description,
      },
      ...spends,
    ]);
  };

  return (
    <Modal
      show={openModal}
      headerClass='spending'
      header='Add Spending'
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
          <label>Spend</label>
          <input
            name='spend'
            type='number'
            maxLength='6'
            minLength='0'
            placeholder='Your Spend'
            onChange={spendChangeHandler}
            value={spend}
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
            className='okSpendingButton'
            type='submit'
            onClick={addSpendingHandler}
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

export default SpendModal;
