import css from './SearchBar.module.css';
import { useState } from 'react';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <header className={css.SearchBar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormBtn}>
          <span className={css.SearchFormBtnLbl}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={css.SearchFormInput}
          type="text"
          //   autocomplete="off"
          //   autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default SearchBar;
