import React from 'react';
import Grid from '@mui/material/Grid';
import PaginateItem from './PaginateItem';

const PaginateItemLít = (props) => {
    return (
        <Grid container spacing={2}>
            {props.items.map((item) => 
                <Grid item xs={12} md={4}>
                    <PaginateItem item={item}/>
                </Grid>
            )}
        </Grid>
    );
};

export default PaginateItemLít;