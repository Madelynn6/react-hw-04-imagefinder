import { useState, useEffect } from 'react';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MagnifyingGlass } from 'react-loader-spinner';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = query => {
    setValue(query);
    setPhotos([]);
    setPage(1);
  };

  useEffect(() => {
    if (value) {
      fetchImages(value, page);
    }
  }, [value, page]);

  const fetchImages = async (value, page) => {
    setIsLoading(true);
    const KEY = '33147468-be6e810c2e40f64bef77a2416';
    const BASE = 'https://pixabay.com/api/';
    const FILTER = 'image_type=photo&orientation=horizontal&per_page=12';

    setTimeout(async () => {
      try {
        const response = await axios.get(
          `${BASE}?q=${value}&page=${page}&key=${KEY}&${FILTER}`
        );
        if (response.data.hits.length > 0) {
          Notify.success(`Success! We found you pictures of ${value} :)`);
          setPhotos(photos => [...photos, ...response.data.hits]);
        } else if (page > 1) {
          Notify.info('Sorry, there are no more matches.');
        } else {
          Notify.failure("Sorry, we couldn't find any matches.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const onImgClick = image => {
    setShowModal(true);
    setSelectedImage(image);
  };

  const onImgClose = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="box">
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery>
        <ImageGalleryItem
          photos={photos}
          onClick={onImgClick}
        ></ImageGalleryItem>
      </ImageGallery>
      {isLoading && <MagnifyingGlass />}
      {photos.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {showModal && <Modal image={selectedImage} onClose={onImgClose} />}
    </div>
  );
};

export default App;
