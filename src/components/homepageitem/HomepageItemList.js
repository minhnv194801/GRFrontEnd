import React from 'react';
import Grid from '@mui/material/Grid';
import HomepageItem from './HomepageItem';

const HomepageItemList = (props) => {
    return (
        <Grid container spacing={2}>
            {props.items.map((item) => 
                <Grid item xs={12} md={4}>
                    <HomepageItem item={item}/>
                </Grid>
            )}
      </Grid>
    );
};

export default HomepageItemList;