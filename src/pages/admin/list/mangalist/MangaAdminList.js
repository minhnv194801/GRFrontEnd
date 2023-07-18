import React from 'react';
import { useState } from 'react';
import { Button, FormControl, Grid, InputAdornment, InputBase } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import ListAdminWrapper from '../component/listadminwrapper/ListAdminWrapper';
import ListAdminHeader from '../component/listadminheader/ListAdminHeader';
import './MangaAdminList.css';
import { useEffect } from 'react';
import MangaItemCard from './mangaitemcard/MangaItemCard';

const gridItemStyle = {
    'display': 'flex',
    'textAlign': 'center',
    'justifyContent': 'center',
}

//TODO: connect to backend
const MangaAdminList = (props) => {
    const searchFieldList = [
        { key: "name", value: "Theo tên truyện" },
        { key: "followedUsers", value: "Theo ID người theo dõi" }
    ]
    const sortFieldList = [
        { key: "name", value: "Theo tên truyện" },
        { key: "updateTime", value: "Theo thời gian cập nhật" }
    ]
    const sorttypes = [
        { key: "DESC", value: "Giảm dần" },
        { key: "ASC", value: "Tăng dần" }
    ]
    const [itemCount, setItemCount] = useState("1-8/150")
    const [pageCount, setPageCount] = useState(20)
    const [paginateSelectorList, setPaginateSelectorList] = useState([])
    const [itemList, setItemList] = useState([])

    useEffect(() => {
        //TODO: fetch backend
        setItemList([
            {
                'cover': '/mangaicon.jpg',
                'name': 'Manga',
                'href': '/admin/manga/show',
            },
            {
                'cover': '/mangaicon.jpg',
                'name': 'Manga',
                'href': '/admin/manga/show',
            },
            {
                'cover': '/mangaicon.jpg',
                'name': 'Manga',
                'href': '/admin/manga/show',
            },
            {
                'cover': '/mangaicon.jpg',
                'name': 'Manga',
                'href': '/admin/manga/show',
            },
            {
                'cover': '/mangaicon.jpg',
                'name': 'Manga',
                'href': '/admin/manga/show',
            },
            {
                'cover': '/mangaicon.jpg',
                'name': 'Manga',
                'href': '/admin/manga/show',
            },
            {
                'cover': '/mangaicon.jpg',
                'name': 'Manga',
                'href': '/admin/manga/show',
            },
            {
                'cover': '/mangaicon.jpg',
                'name': 'Manga',
                'href': '/admin/manga/show',
            },
        ])
    }, [])

    useEffect(() => {
        setPaginateSelectorList(Array.from({ length: pageCount }, (_, i) => i + 1))
    }, [pageCount])

    return (
        <ListAdminWrapper>
            <ListAdminHeader
                createable
                searchFieldList={searchFieldList}
                itemCount={itemCount}
                paginateSelectorList={paginateSelectorList}
                sortFieldList={sortFieldList}
                sorttypes={sorttypes} />
            <Grid container spacing={5}>
                {itemList.map((item) => (
                    <Grid item xs={3} sx={gridItemStyle}>
                        <MangaItemCard
                            cover={item.cover}
                            content={item.name}
                            href={item.href} />
                    </Grid>
                ))}
            </Grid>
        </ListAdminWrapper>
    )
}

export default MangaAdminList