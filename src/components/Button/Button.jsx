// import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
};

// ContactList.propTypes = {
//   filtered: PropTypes.array,
//   handleChange: PropTypes.func,
// };

export default Button;
