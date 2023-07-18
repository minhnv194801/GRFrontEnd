import React from 'react';
import { useState } from 'react';
import { Button, FormControl, Grid, InputAdornment, InputBase } from '@mui/material';
import ListAdminWrapper from '../component/listadminwrapper/ListAdminWrapper';
import ListAdminHeader from '../component/listadminheader/ListAdminHeader';
import { useEffect } from 'react';
import { AccountCircle } from '@mui/icons-material';
import UserItemCard from './useritemcard/UserItemCard';

const gridItemStyle = {
    'display': 'flex',
    'textAlign': 'center',
    'justifyContent': 'center',
}

//TODO: connect to backend
const UserAdminList = (props) => {
    const searchFieldList = [
        { key: "displayName", value: "Theo tên hiển thị" },
        { key: "email", value: "Theo email tài khoản" },
        { key: "followMangas", value: "Theo id manga theo dõi" },
        { key: "ownedChapters", value: "Theo id chương truyện sở hữu" },
    ]
    const sortFieldList = [
        { key: "displayName", value: "Theo tên hiển thị" },
        { key: "email", value: "Theo email tài khoản" },
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
                'avatar': '/defaultavatar.jpg',
                'displayName': 'Tên hiển thị',
                'email': 'email@email.com',
                'role': 'Người dùng',
                'href': '/admin/user/show',
            },
            {
                'avatar': '/defaultavatar.jpg',
                'displayName': 'Tên hiển thị',
                'email': 'email@email.com',
                'role': 'Người dùng',
                'href': '/admin/user/show',
            },
            {
                'avatar': '/defaultavatar.jpg',
                'displayName': 'Tên hiển thị',
                'email': 'email@email.com',
                'role': 'Người dùng',
                'href': '/admin/user/show',
            },
            {
                'avatar': '/defaultavatar.jpg',
                'displayName': 'Tên hiển thị',
                'email': 'email@email.com',
                'role': 'Người dùng',
                'href': '/admin/user/show',
            },
            {
                'avatar': '/defaultavatar.jpg',
                'displayName': 'Tên hiển thị',
                'email': 'email@email.com',
                'role': 'Người dùng',
                'href': '/admin/user/show',
            },
            {
                'avatar': '/defaultavatar.jpg',
                'displayName': 'Tên hiển thị',
                'email': 'email@email.com',
                'role': 'Người dùng',
                'href': '/admin/user/show',
            },
            {
                'avatar': '/defaultavatar.jpg',
                'displayName': 'Tên hiển thị',
                'email': 'email@email.com',
                'role': 'Người dùng',
                'href': '/admin/user/show',
            },
            {
                'avatar': '/defaultavatar.jpg',
                'displayName': 'Tên hiển thị',
                'email': 'email@email.com',
                'role': 'Người dùng',
                'href': '/admin/user/show',
            },
            {
                'avatar': '/defaultavatar.jpg',
                'displayName': 'Tên hiển thị',
                'email': 'email@email.com',
                'role': 'Người dùng',
                'href': '/admin/user/show',
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
                    <Grid item xs={4} sx={gridItemStyle}>
                        <UserItemCard
                            avatar={item.avatar}
                            displayName={item.displayName}
                            email={item.email}
                            role={item.role}
                            href={item.href} />
                    </Grid>
                ))}
            </Grid>
        </ListAdminWrapper>
    )
}

export default UserAdminList