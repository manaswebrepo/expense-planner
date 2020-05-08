import { useState, useEffect } from "react";
import _ from "lodash";

export const useForm = (callback) => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
    // callback();
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

// export const useStateWithLocalStorage = (localStorageKey) => {
//   const [value, setValue] = useState(
//     localStorage.getItem(localStorageKey) || ""
//   );

//   useEffect(() => {
//     localStorage.setItem(localStorageKey, value);
//   }, [value]);

//   return [value, setValue];
// };
