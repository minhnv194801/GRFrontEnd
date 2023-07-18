import React from 'react';
import { useState } from 'react';
import { Button, FormControl, Grid, InputAdornment, InputBase } from '@mui/material';
import ListAdminWrapper from '../component/listadminwrapper/ListAdminWrapper';
import ListAdminHeader from '../component/listadminheader/ListAdminHeader';
import { useEffect } from 'react';
import ReportItemCard from './reportitemcard/ReportItemCard';

const gridItemStyle = {
    'display': 'flex',
    'textAlign': 'center',
    'justifyContent': 'center',
}

//TODO: connect to backend
const ReportAdminList = (props) => {
    const searchFieldList = [
        { key: "user", value: "Theo ID tài khoản báo lỗi" },
        { key: "chapter", value: "Theo ID chương truyện lỗi" },
    ]
    const sortFieldList = [
        { key: "timeCreated", value: "Theo thời gian báo lỗi" }
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
        setItemList([
            {
                'chapterCover': '/chaptericon.jpg',
                'chapterTitle': 'Chapter',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Ảnh chương truyện bị lỗi',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/report/show',
                'status': 0,
            },
            {
                'chapterCover': '/chaptericon.jpg',
                'chapterTitle': 'Chapter',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Ảnh chương truyện bị lỗi',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/report/show',
                'status': 0,
            },
            {
                'chapterCover': '/chaptericon.jpg',
                'chapterTitle': 'Chapter',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Ảnh chương truyện bị lỗi',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/report/show',
                'status': 1,
            },
            {
                'chapterCover': '/chaptericon.jpg',
                'chapterTitle': 'Chapter',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Ảnh chương truyện bị lỗi',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/report/show',
                'status': 1,
            },
            {
                'chapterCover': '/chaptericon.jpg',
                'chapterTitle': 'Chapter',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Ảnh chương truyện bị lỗi',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/report/show',
                'status': 1,
            },
            {
                'chapterCover': '/chaptericon.jpg',
                'chapterTitle': 'Chapter',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Ảnh chương truyện bị lỗi',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/report/show',
                'status': 1,
            },
        ])
    }, [])

    useEffect(() => {
        setPaginateSelectorList(Array.from({ length: pageCount }, (_, i) => i + 1))
    }, [pageCount])

    return (
        <ListAdminWrapper>
            <ListAdminHeader
                searchFieldList={searchFieldList}
                itemCount={itemCount}
                paginateSelectorList={paginateSelectorList}
                sortFieldList={sortFieldList}
                sorttypes={sorttypes} />
            <Grid container spacing={5}>
                {itemList.map((item) => (
                    <Grid item xs={6}>
                        <ReportItemCard
                            chapterCover={item.chapterCover}
                            chapterTitle={item.chapterTitle}
                            userAvatar={item.userAvatar}
                            userDisplayname={item.userDisplayname}
                            content={item.content}
                            updateTime={item.updateTime}
                            status={item.status}
                            href={item.href}
                        />
                    </Grid>
                ))}
            </Grid>
        </ListAdminWrapper>
    )
}

export default ReportAdminList