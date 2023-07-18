import React from 'react';
import { useState } from 'react';
import { Button, FormControl, Grid, InputAdornment, InputBase } from '@mui/material';
import ListAdminWrapper from '../component/listadminwrapper/ListAdminWrapper';
import ListAdminHeader from '../component/listadminheader/ListAdminHeader';
import { useEffect } from 'react';
import ChapterItemCard from './chapteritemcard/ChapterItemCard';

const gridItemStyle = {
    'display': 'flex',
    'textAlign': 'center',
    'justifyContent': 'center',
}

//TODO: connect to backend
const ChapterAdminList = (props) => {
    const searchFieldList = [
        { key: "name", value: "Theo tên chương truyện" },
        { key: "ownedUsers", value: "Theo ID tài khoản sở hữu" },
    ]
    const sortFieldList = [
        { key: "updateTime", value: "Theo thời gian cập nhật" },
        { key: "name", value: "Theo tên chương truyện" },
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
                'cover': '/chaptericon.jpg',
                'name': 'Chapter',
                'href': '/admin/chapter/show',
            },
            {
                'cover': '/chaptericon.jpg',
                'name': 'Chapter',
                'href': '/admin/chapter/show',
            },
            {
                'cover': '/chaptericon.jpg',
                'name': 'Chapter',
                'href': '/admin/chapter/show',
            },
            {
                'cover': '/chaptericon.jpg',
                'name': 'Chapter',
                'href': '/admin/chapter/show',
            },
            {
                'cover': '/chaptericon.jpg',
                'name': 'Chapter',
                'href': '/admin/chapter/show',
            },
            {
                'cover': '/chaptericon.jpg',
                'name': 'Chapter',
                'href': '/admin/chapter/show',
            },
            {
                'cover': '/chaptericon.jpg',
                'name': 'Chapter',
                'href': '/admin/chapter/show',
            },
            {
                'cover': '/chaptericon.jpg',
                'name': 'Chapter',
                'href': '/admin/chapter/show',
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
                        <ChapterItemCard
                            cover={item.cover}
                            content={item.name}
                            href={item.href} />
                    </Grid>
                ))}
            </Grid>
        </ListAdminWrapper>
    )
}

export default ChapterAdminList