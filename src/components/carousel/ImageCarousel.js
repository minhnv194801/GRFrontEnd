import CarouselItem from './CarouselItem.js';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './ImageCarousel.css';

function ImageCarousel(props) {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 6,
      partialVisibilityGutter: -10
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 2,
      partialVisibilityGutter: -10
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 5,
      partialVisibilityGutter: -10
    }
  };

  return (
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        partialVisible={true}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        transitionDuration={500}
      >
        {props.items.map((item) => <CarouselItem key={item} text={item.title} image={item.image} href={item.href}></CarouselItem>)}
      </Carousel>
  );
}

export default ImageCarousel;