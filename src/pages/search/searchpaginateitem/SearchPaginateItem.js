import React from 'react';
import Grid from '@mui/material/Grid';
import { Circle, Star } from '@mui/icons-material';
import './SearchPaginateItem.css'

const SearchPaginateItem = (props) => {
    // eslint-disable-next-line
    return (
        <div className='search-paginate-item-wrapper'>
            <a href={props.item.href} className='search-item-href' ><p/></a>
            <Grid container spacing={1} sx={{ width: '100%', height: '100%' }}>
                <Grid item xs={5} sx={{ width: '100%', height: '100%' }} >
                    <div className='search-cover-wrapper'>
                        <img className='search-cover' src={props.item.cover} alt='chapterCover' />
                    </div>
                </Grid>
                <Grid item xs={7} sx={{ textAlign: 'left', width: '100%', height: '100%' }}>
                    <h2 className='search-item-title'>{props.item.title}</h2>
                    <div className='result-info-wrapper'>
                        <div className='rating-status-wrapper'>
                            <div className='rating-wrapper'>
                                <Star sx={{ color: 'yellow' }} fontSize='small' />
                                {props.item.rating === 0 ? 'N/a' : Number(props.item.rating).toFixed(2)}
                            </div>
                            <div className='status-wrapper'>
                                <Circle sx={{ color: props.item.status === 0 ? '#00FF00' : '#87CEEB' }} fontSize='small' />
                                {props.item.status === 0 ? "Đang tiến hành" : "Đã hoàn thành"}
                            </div>
                        </div>
                        <div className="result-tag-list-wrapper">
                            {props.item.tags === undefined ? null : props.item.tags.map((tag) => <div className="result-tag-wrapper">{tag}</div>)}
                        </div>
                        <div className='result-description-wrapper'>{props.item.description}</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default SearchPaginateItem;