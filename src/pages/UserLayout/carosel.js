import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageSlider = () => {
  return (
    <div className="image-sliderk">
      <Carousel
        autoPlay={true}
        interval={3000} // Time in milliseconds between slides
        infiniteLoop={true} // Loop back to the beginning when reaching the end
        showStatus={false} // Hide the status indicator
        showThumbs={false} // Hide the thumbnail images
      >
        <div>
          <img src="https://via.placeholder.com/400x200" alt="Image 1" />
          <p className="legend">Image 1</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/400x200" alt="Image 2" />
          <p className="legend">Image 2</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/400x200" alt="Image 3" />
          <p className="legend">Image 3</p>
        </div>
        {/* Add more images as needed */}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
