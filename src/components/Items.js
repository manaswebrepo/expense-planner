import React from "react";
import "./items.css";

const Items = (props) => {
  const { income, description, id, className, date, spend, removeItem } = props;
  return (
    <>
      <li id={id}>
        <div className='list-item'>
          <div className='spending-amount-date'>
            <label>{date}</label>
            <span className={className}>{income ? income : spend} Kc</span>
          </div>
          <div className='description'>{description}</div>
          <div className='material-icons' onClick={removeItem}>
            delete_forever
          </div>
        </div>
      </li>
    </>
  );
};

export default Items;
