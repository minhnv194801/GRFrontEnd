import React from 'react';
import MangaChapter from './MangaChapter';
import { Grid } from '@mui/material';

const MangaChapterList = (props) => {
    return (
        props.chapterList ?
            <Grid container spacing={3}>
                {props.chapterList.map((chapter) =>
                    <Grid item xs={12} md={6}>
                        <MangaChapter chapter={chapter} manga={props.manga} mangaId={props.mangaId}/>
                    </Grid>
                )}
            </Grid>
            :
            <h5>Truyện hiện chưa có chương truyện nào, bạn vui lòng đợi nhé</h5>
    );
};

export default MangaChapterList;