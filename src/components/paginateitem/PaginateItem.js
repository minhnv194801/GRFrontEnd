import React from 'react';
import Grid from '@mui/material/Grid';
import './PaginateItem.css'

const PaginateItem = (props) => {
    return (
        <div className='paginate-item-wrapper'>
            <a href={props.item.href}>
                <img className='cover' src={props.item.cover} alt='chapterCover'/>
            </a>
            <a className='chapter-title-href' href={props.item.href}>
                <h2 className='item-title'>{props.item.title}</h2>
            </a>
            {props.item.chapters.map((chapter) => 
                <Grid container key={chapter.id}>
                    <Grid item xs={0} md={1}></Grid>
                    <Grid item xs={6} md={5} sx={{
                        textAlign: 'left',
                    }}>
                        <a className='chapter-title-href' href={chapter.href}>
                            <p className='chapter-title'>{chapter.name}</p>
                        </a>
                    </Grid>
                    <Grid item xs={6} md={5}>
                        <i className='time'>
                            {chapter.updateTime}
                        </i>
                    </Grid>
                    <Grid item xs={0} md={1}></Grid>
                </Grid>
            )}
        </div>
    );
};

export default PaginateItem;