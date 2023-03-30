import { Component } from 'react';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MagnifyingGlass } from 'react-loader-spinner';

import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    photos: [],
    value: '',
    prevValue: '',
    isLoading: false,
    page: 1,
    showModal: false,
    selectedImage: null,
  };

  handleSearch = query => {
    if (query !== this.state.prevValue) {
      this.setState({ value: query, photos: [], page: 1, prevQuery: query });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const { value, page } = this.state;
    if (value !== prevState.value || prevState.page !== page) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    this.setState({
      isLoading: true,
    });
    const { value, page } = this.state;
    const KEY = '33147468-be6e810c2e40f64bef77a2416';
    const BASE = 'https://pixabay.com/api/';
    const FILTER = 'image_type=photo&orientation=horizontal&per_page=12';

    setTimeout(async () => {
      try {
        const response = await axios.get(
          `${BASE}?q=${value}&page=${page}&key=${KEY}&${FILTER}`
        );
        if (response.data.hits.length > 0) {
          Notify.success(`Success! We found you pictures of ${value}`);
          this.setState(prevState => ({
            photos: [...prevState.photos, ...response.data.hits],
          }));
        } else if (page > 1) {
          Notify.info('Sorry, there are no more matches.');
        } else {
          Notify.failure("Sorry, we couldn't find any matches.");
        }
      } catch (error) {
        this.setState({ error });
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }, 500);
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onImgClick = image => {
    this.setState({
      showModal: true,
      selectedImage: image,
    });
    console.log(image);
  };

  onImgClose = () => {
    this.setState({
      showModal: false,
      selectedImage: null,
    });
  };

  render() {
    const { photos, isLoading, showModal, selectedImage } = this.state;
    return (
      <div className="box">
        <SearchBar onSubmit={this.handleSearch} />
        <ImageGallery>
          <ImageGalleryItem
            photos={photos}
            onClick={this.onImgClick}
          ></ImageGalleryItem>
        </ImageGallery>
        {isLoading && <MagnifyingGlass />}
        {photos.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && <Modal image={selectedImage} onClose={this.onImgClose} />}
      </div>
    );
  }
}

export default App;
