import React from 'react';
import { useState } from 'react';
import { Button, FormControl, Grid, InputAdornment, InputBase } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import ListAdminWrapper from '../component/listadminwrapper/ListAdminWrapper';
import ListAdminHeader from '../component/listadminheader/ListAdminHeader';
import './MangaAdminList.css';
import { useEffect } from 'react';
import MangaItemCard from './mangaitemcard/MangaItemCard';
import { useSearchParams } from 'react-router-dom';

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
        { key: "updateTime", value: "Theo thời gian cập nhật" },
        { key: "name", value: "Theo tên truyện" },
    ]
    const sorttypes = [
        { key: "DESC", value: "Giảm dần" },
        { key: "ASC", value: "Tăng dần" }
    ]
    const itemPerPage = 8

    const [itemCount, setItemCount] = useState("")
    const [pageCount, setPageCount] = useState(1)
    const [paginateSelectorList, setPaginateSelectorList] = useState([])
    const [itemList, setItemList] = useState([])
    const [searchParams] = useSearchParams()

    var searchField = searchParams.get('searchfield') ? searchParams.get('searchfield') : ''
    var searchValue = searchParams.get('searchvalue') ? searchParams.get('searchvalue') : ''
    var page = searchParams.get('page') ? searchParams.get('page') : 1
    var sortField = searchParams.get('sortfield') ? searchParams.get('sortfield') : ''
    var sortType = searchParams.get('sorttype') ? searchParams.get('sorttype') : ''

    useEffect(() => {
        const fetchItem = async () => {
            let apiUrl = 'http://localhost:8081/api/v1/admin/mangas?'
            let sortUrl = 'sort=['
            let apiSortField = sortFieldList[0].key
            let apiSortType = sorttypes[0].key
            if (sortField !== '') {
                apiSortField = sortField
            }
            if (sortType !== '') {
                apiSortType = sortType
            }
            sortUrl += '"' + apiSortField + '","' + apiSortType + '"]'
            apiUrl += sortUrl

            let rangeUrl = 'range=['
            let startItemIndex = (page - 1) * itemPerPage
            rangeUrl += startItemIndex + ',' + itemPerPage + ']'
            apiUrl += '&' + rangeUrl

            let filterUrl = 'filter=['
            let apiFilterField = searchFieldList[0].key
            if (searchField !== '') {
                apiFilterField = searchField
            }
            if (searchValue.trim() !== '') {
                filterUrl += '"' + apiFilterField + '","' + searchValue + '"]'
                apiUrl += '&' + filterUrl
            }

            console.log(apiUrl)

            const response = await fetch(apiUrl, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // convert data to json
                const json = await response.json();
                json.forEach((item) => {
                    item.href = '/admin/manga/show/' + item.id
                })
                let fetchItemCount = response.headers.get('Content-Range')
                setItemCount(fetchItemCount)
                let totalItemCount = fetchItemCount.split('/')[1]
                setPageCount(Math.ceil(parseInt(totalItemCount) / itemPerPage))
                console.log(json)
                setItemList(json)
            }
        }

        fetchItem()
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