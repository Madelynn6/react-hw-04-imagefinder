import css from './SearchBar.module.css';

import { Component } from 'react';

class SearchBar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    const inputValue = e.target.value;
    this.setState({
      query: inputValue,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    return (
      <header className={css.SearchBar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormBtn}>
            <span className={css.SearchFormBtnLbl}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            className={css.SearchFormInput}
            type="text"
            //   autocomplete="off"
            //   autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
