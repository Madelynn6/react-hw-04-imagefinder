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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
