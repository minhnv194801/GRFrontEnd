import React from 'react';
import Grid from '@mui/material/Grid';
import NewsPaginateItem from './NewsPaginateItem';

const NewsPaginateItemList = (props) => {
    return (
        <div className='news-paginate-item-list-wrapper'>
            <Grid container spacing={2} >
                {props.items.map((item) =>
                    <Grid key={item.id} item xs={12} md={6} lg={4}>
                        <NewsPaginateItem item={item} />
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default NewsPaginateItemList;