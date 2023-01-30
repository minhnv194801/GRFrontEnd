import CarouselItem from './CarouselItem.js';
import './ImageCarousel.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function ImageCarousel(props) {
  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 5,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  };

  return (
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        centerMode
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        transitionDuration={500}
      >
        {props.items.map((item) => <CarouselItem text={item.title} image={item.image} href={item.href}></CarouselItem>)}
      </Carousel>
  );
}

export default ImageCarousel;