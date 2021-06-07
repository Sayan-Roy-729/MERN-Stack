import image1 from '../../assets/products/image1.jpeg';
import image2 from '../../assets/products/image2.jpeg';
import image3 from '../../assets/products/image3.jpeg';
import image4 from '../../assets/products/image4.jpeg';
import image5 from '../../assets/products/image5.jpeg';
import image6 from '../../assets/products/image6.jpeg';
import image7 from '../../assets/products/image7.jpeg';
import image8 from '../../assets/products/image8.jpeg';
import image9 from '../../assets/products/image9.jpeg';
import image10 from '../../assets/products/image10.jpeg';
import image11 from '../../assets/products/image11.jpeg';
import image12 from '../../assets/products/image12.jpeg';

const initialState = {
  products: [
    {
      title: 'Intel Core i5',
      image: image1,
      rating: 4.5,
      ratingCount: 70,
      price: 7500,
    },
    {
      title: 'Ryzen 5',
      image: image2,
      rating: 4.3,
      ratingCount: 83,
      price: 5600,
    },
    {
      title: 'Intel Core i9',
      image: image3,
      rating: 4.8,
      ratingCount: 112,
      price: 9000,
    },
    {
      title: 'Ryzen 5',
      image: image4,
      rating: 4.2,
      ratingCount: 112,
      price: 9000,
    },
    {
      title: 'intel core i5',
      image: image5,
      rating: 4.8,
      ratingCount: 112,
      price: 9000,
    },
    {
      title: 'Mechanical Engineering',
      image: image6,
      rating: 4.8,
      ratingCount: 112,
      price: 9000,
    },
    {
      title: 'Wrist Watch',
      image: image7,
      rating: 4.8,
      ratingCount: 112,
      price: 9000,
    },
    {
      title: 'Ear Pod',
      image: image8,
      rating: 4.8,
      ratingCount: 112,
      price: 9000,
    },
    {
      title: 'Phone Camera Guard',
      image: image9,
      rating: 4.8,
      ratingCount: 112,
      price: 9000,
    },
    {
      title: 'Sony 34inch TV',
      image: image10,
      rating: 4.8,
      ratingCount: 112,
      price: 9000,
    },
    {
      title: 'Photo Viewer',
      image: image11,
      rating: 4.8,
      ratingCount: 112,
      price: 9000,
    },
    {
      title: 'AMD Processing Unit',
      image: image12,
      rating: 4.8,
      ratingCount: 112,
      price: 9000,
    },
  ],
};

const productReducer = (state = initialState, action) => {
  return state;
};

export default productReducer;
