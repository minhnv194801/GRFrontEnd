import React from 'react'
import './CarouselItem.css'

function CarouselItem(props) {
    return (
        <div className='wrapper'>
            <a className='href-on-image' href={props.href}>
                <img className='image' src={props.image} alt=""></img>
                <div className='text-on-image'>
                    <h3 className='text-on-image'> {props.text} </h3>
                </div>
            </a>
        </div>
    );
}
  
export default CarouselItem;


