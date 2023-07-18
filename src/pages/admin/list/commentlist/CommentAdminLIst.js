import React from 'react';
import { useState } from 'react';
import { Button, FormControl, Grid, InputAdornment, InputBase } from '@mui/material';
import ListAdminWrapper from '../component/listadminwrapper/ListAdminWrapper';
import ListAdminHeader from '../component/listadminheader/ListAdminHeader';
import { useEffect } from 'react';
import CommentItemCard from './commentitemcard/CommentItemCard';

//TODO: connect to backend
const CommentAdminList = (props) => {
    const searchFieldList = [
        { key: "user", value: "Theo ID tài khoản bình luận" },
    ]
    const sortFieldList = [
        { key: "timeCreated", value: "Theo thời gian bình luận" }
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
                'mangaCover': '/mangaicon.jpg',
                'mangaTitle': 'Manga',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Truyện hay!',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/comment/show',
            },
            {
                'mangaCover': '/mangaicon.jpg',
                'mangaTitle': 'Manga',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Truyện hay!',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/comment/show',
            },
            {
                'mangaCover': '/mangaicon.jpg',
                'mangaTitle': 'Manga',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Truyện hay!',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/comment/show',
            },
            {
                'mangaCover': '/mangaicon.jpg',
                'mangaTitle': 'Manga',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Truyện hay!',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/comment/show',
            },
            {
                'mangaCover': '/mangaicon.jpg',
                'mangaTitle': 'Manga',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Truyện hay!',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/comment/show',
            },
            {
                'mangaCover': '/mangaicon.jpg',
                'mangaTitle': 'Manga',
                'userAvatar': '/defaultavatar.jpg',
                'userDisplayname': 'Tên hiển thị',
                'content': 'Truyện hay!',
                'updateTime': '16:57 1/02/2023',
                'href': '/admin/comment/show',
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
                        <CommentItemCard 
                            mangaCover={item.mangaCover}
                            mangaTitle={item.mangaTitle}
                            userAvatar={item.userAvatar}
                            userDisplayname={item.userDisplayname}
                            content={item.content}
                            updateTime={item.updateTime}
                            href={item.href}
                        />
                    </Grid>
                ))}
            </Grid>
        </ListAdminWrapper>
    )
}

export default CommentAdminList