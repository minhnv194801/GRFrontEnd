import React from 'react';
import Grid from '@mui/material/Grid';
import SearchPaginateItem from './SearchPaginateItem';

const SearchPaginateItemList = (props) => {
    console.log(props.items)
    return (
        <div className='search-paginate-item-list-wrapper'>
            <Grid container spacing={3}>
                {props.items.map((item) =>
                    <Grid key={item.id} item xs={12} md={6} lg={4} sx={{height: '40vh'}}>
                        <SearchPaginateItem item={item} />
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default SearchPaginateItemList;