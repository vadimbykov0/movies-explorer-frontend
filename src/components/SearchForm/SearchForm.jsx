import { useState } from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormValidation from '../../hooks/useFormValidation';

import './SearchForm.css';

export default function SearchForm({ isCheck, changeState }) {
  const [isError,setIsError] = useState(false);
  const {values, isValid, handleChange} = useFormValidation();

  function onSubmit(evt) {
    evt.preventDefault()
      if (!isValid) {
        setIsError(true)
        return
      } else {
        setIsError(false)
      };
  }

  return (
    <section className="search">
      <div className="search__box">
        <form
          className="search__form"
          value={values.search}
          onSubmit={onSubmit}
          noValidate
        >
          <div className="search__form-box">
            <input
            className="search__input"
            name="search-movies"
            placeholder="Фильм"
            type="text"
            onChange={handleChange}
            minLength="1"
            maxLength="200"
            required
            />
            <button className="search__submit" type="submit"></button>
          </div>
          <FilterCheckbox
          isCheck={isCheck}
          changeState={changeState}
          />
        </form>
        <span className={`search__error ${isError && 'search__error_type_active'}`}>{isError ? 'Введите название фильма' : ''}</span>
      </div>
    </section>
  );
}
