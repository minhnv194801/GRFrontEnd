import React from 'react'
import './CarouselItem.css'

function CarouselItem(props) {
    return (
        <a className= 'wrapper' href={props.href}>
            <img fetchpriority="high" className='image' src={props.image} alt=""></img>
            <div className='text-on-image'>
                <h3> {props.text} </h3>
            </div>
        </a>
    );
}
  
export default CarouselItem;


