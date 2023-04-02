import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ photos, onClick }) => {
  return photos.map(el => (
    <li className={css.ImageGalleryItem} key={el.id}>
      <img
        className={css.ImageGalleryItemImg}
        onClick={() => onClick(el.largeImageURL)}
        src={el.webformatURL}
        alt={el.tags}
      />
    </li>
  ));
};
export default ImageGalleryItem;
