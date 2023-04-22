import React from 'react';
import Grid from '@mui/material/Grid';
import PaginateItem from './PaginateItem';

const PaginateItemList = (props) => {
    return (
        <Grid container spacing={2}>
            {props.items.map((item) => 
                <Grid key={item.id} item xs={6} md={4}>
                    <PaginateItem item={item}/>
                </Grid>
            )}
        </Grid>
    );
};

export default PaginateItemList;