import React from 'react';
import Grid from '@mui/material/Grid';
import './NewsPaginateItem.css'

const NewsPaginateItem = (props) => {
    if (props.item.chapters === null) {
        props.item.chapters = []
    }
    return (
        <div className='news-paginate-item-wrapper'>
            <Grid container spacing={1}>
                <Grid item xs={3} sx={{minHeight: '200px'}}>
                    <div className='news-cover-wrapper'>
                        <a href={props.item.href} className='news-cover-href'>
                            <img className='news-cover' src={props.item.cover} alt='chapterCover' />
                        </a>
                    </div>
                </Grid>
                <Grid item xs={9} sx={{ textAlign: 'left', minHeight: '200px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <a className='news-chapter-title-href' href={props.item.href}>
                        <h2 className='news-item-title'>{props.item.title}</h2>
                    </a>
                    {props.item.chapters.map((chapter) =>
                        <Grid container key={chapter.id}>
                            <Grid item xs={7} md={7}>
                                <a className='news-chapter-title-href' href={chapter.href}>
                                    <p className='news-chapter-title'>{chapter.name}</p>
                                </a>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <i className='news-time'>
                                    {chapter.updateTime}
                                </i>
                            </Grid>
                            <Grid item xs={1} md={1}></Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default NewsPaginateItem;