import React from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from "../hooks/useFormWithValidation";

const Register = ({ onRegister }) => {

  // Используем пользовательский Хук
  const {
    values,
    handleChange,
    resetFrom,
    errors,
    isValid,
    isValidInputs
  } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем совпадение паролей
    if (values.password !== values.confirmation) {

      resetFrom({
        email: values.email,
      }, {
        password: 'Пароли не совпадают',
        confirmation: 'Пароли не совпадают'
      }, false, {
        email: true,
      })
      return;
    }

    // Запрос на сервер и обработка результата
    onRegister(values)
      .then(resetFrom())
      .catch(err => {
        console.log("пошел в жопу")
        console.log(err.message || 'Что то пошло не так')
      })
  }

  return (
    <main className="register content page__content">
      <div className="register__container">
        <h2 className="register__title">Регистрация</h2>
        <form
          className="register__form"
          name="form"
          id="form-with-register"
          onSubmit={handleSubmit}>

          <input
            className={`register__input register__input_type_email
        ${isValidInputs.email
                ? 'register__input_state_valid'
                : ''
              }`}
            type="email"
            placeholder="Email"
            name="email"
            id="register-input-email"
            minLength="2"
            maxLength="100"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
          <span
            id="register-input-email-error"
            className="register__error">
            {errors.email || ""}
          </span>

          <input
            className={`register__input register__input_type_password
        ${isValidInputs.password
                ? 'register__input_state_valid'
                : ''
              }`}
            type="password"
            placeholder="Пароль"
            name="password"
            id="register-input-password"
            minLength="6"
            maxLength="50"
            value={values.password || ""}
            onChange={handleChange}
            required
          />
          <span
            id="register-input-password-error"
            className="register__error">
            {errors.password || ""}
          </span>

          <input
            className={`register__input register__input_type_confirm-password
        ${isValidInputs.confirmation
                ? 'register__input_state_valid'
                : ''
              }`}
            type="password"
            placeholder="Подтвердите пароль"
            name="confirmation"
            id="register-input-confirm-password"
            minLength="2"
            maxLength="50"
            value={values.confirmation || ""}
            onChange={handleChange}
            required
          />
          <span
            id="register-input-confirm-password-error"
            className="register__error">
            {errors.confirmation || ""}
          </span>

          <button
            className={`button register__button-submit 
            ${!isValid
                ? 'register__button-submit_invalid'
                : ''
              }`}
            type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <p>Уже зарегистрированы? <Link to="/sign-in" className="register__login-link">Войти</Link></p>
        </div>
      </div>
    </main>
  );
}

export default Register;