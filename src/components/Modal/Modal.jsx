import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ image, onClose }) => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div onClick={onClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Modal;
