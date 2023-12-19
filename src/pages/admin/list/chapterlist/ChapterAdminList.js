import React from 'react';
import { useState } from 'react';
import { Grid } from '@mui/material';
import ListAdminWrapper from '../component/listadminwrapper/ListAdminWrapper';
import ListAdminHeader from '../component/listadminheader/ListAdminHeader';
import { useEffect } from 'react';
import ChapterItemCard from './chapteritemcard/ChapterItemCard';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const gridItemStyle = {
    'display': 'flex',
    'textAlign': 'center',
    'justifyContent': 'center',
}

//TODO: connect to backend
const ChapterAdminList = (props) => {
    const itemPerPage = 8
    const searchFieldList = [
        { key: "name", value: "Theo tên chương truyện" },
        { key: "manga", value: "Theo ID bộ truyện" },
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
    const [itemCount, setItemCount] = useState("")
    const [pageCount, setPageCount] = useState(1)
    const [paginateSelectorList, setPaginateSelectorList] = useState([])
    const [itemList, setItemList] = useState([])
    const [searchParams] = useSearchParams()
    const sessionkey = useSelector((state) => state.app.sessionkey)

    var searchField = searchParams.get('searchfield') ? searchParams.get('searchfield') : ''
    var searchValue = searchParams.get('searchvalue') ? searchParams.get('searchvalue') : ''
    var page = searchParams.get('page') ? searchParams.get('page') : 1
    var sortField = searchParams.get('sortfield') ? searchParams.get('sortfield') : ''
    var sortType = searchParams.get('sorttype') ? searchParams.get('sorttype') : ''

    useEffect(() => {
        const fetchItem = async () => {
            let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/chapters?'
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

            const response = await fetch(apiUrl, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // convert data to json
                const json = await response.json();
                json.forEach((item) => {
                    item.href = '/admin/chapter/show/' + item.id
                })
                let fetchItemCount = response.headers.get('Content-Range')
                setItemCount(fetchItemCount)
                let totalItemCount = fetchItemCount.split('/')[1]
                setPageCount(Math.ceil(parseInt(totalItemCount) / itemPerPage))
                setItemList(json)
            }
        }

        fetchItem()
        // eslint-disable-next-line
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
                    <Grid item xs={6} md={3} sx={gridItemStyle}>
                        <ChapterItemCard
                            cover={item.cover}
                            content={item.title}
                            href={item.href} />
                    </Grid>
                ))}
            </Grid>
        </ListAdminWrapper>
    )
}

export default ChapterAdminList