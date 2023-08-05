import React, {useCallback} from "react";


export const useFormWithValidation = () => {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
  
    const [isValidInputs, setIsValidInputs] = React.useState({});
  
    const handleChange = (evt) => {
      const input = evt.target;
      const value = input.value;
      const name = input.name;
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: input.validationMessage });
      setIsValid(input.closest("form").checkValidity());
  
      setIsValidInputs({ ...isValidInputs, [name]: input.checkValidity() });
    };
  
    const resetFrom = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false, newIsValidInputs = {}) => {
        console.log(newValues, newErrors, newIsValid, newIsValidInputs)
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
        setIsValidInputs(newIsValidInputs);
      },
      [setValues, setErrors, setIsValid]
    );
  
    return { values, handleChange, resetFrom, errors, isValid, isValidInputs };
  }