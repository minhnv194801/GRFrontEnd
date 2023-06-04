import React from 'react';
import MangaChapter from './MangaChapter';
import { Grid } from '@mui/material';

const MangaChapterList = (props) => {
    return (
        <Grid container spacing={3}>
            {props.chapterList.map((chapter) =>
                <Grid item xs={12} md={6}>
                    <MangaChapter chapter={chapter} />
                </Grid>
            )}
        </Grid>
    );
};

export default MangaChapterList;