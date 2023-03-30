import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div onClick={this.props.onClose} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
