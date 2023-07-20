import React from 'react';
import { useState } from 'react';
import { Button, FormControl, Grid, InputAdornment, InputBase } from '@mui/material';
import ListAdminWrapper from '../component/listadminwrapper/ListAdminWrapper';
import ListAdminHeader from '../component/listadminheader/ListAdminHeader';
import { useEffect } from 'react';
import CommentItemCard from './commentitemcard/CommentItemCard';
import { useSearchParams } from 'react-router-dom';
import { timeConverter } from '../../../../common/Date';

//TODO: connect to backend
const CommentAdminList = (props) => {
    const itemPerPage = 6
    const searchFieldList = [
        { key: "user", value: "Theo ID tài khoản bình luận" },
        { key: "manga", value: "Theo ID bộ truyện bình luận" },
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
    const [searchParams] = useSearchParams()

    var searchField = searchParams.get('searchfield') ? searchParams.get('searchfield') : ''
    var searchValue = searchParams.get('searchvalue') ? searchParams.get('searchvalue') : ''
    var page = searchParams.get('page') ? searchParams.get('page') : 1
    var sortField = searchParams.get('sortfield') ? searchParams.get('sortfield') : ''
    var sortType = searchParams.get('sorttype') ? searchParams.get('sorttype') : ''

    useEffect(() => {
        const fetchUserReference = async (userId) => {
            let apiUrl = 'http://localhost:8081/api/v1/admin/users/reference/' + userId

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
                return json
            }
        }

        const fetchMangaReference = async (mangaId) => {
            let apiUrl = 'http://localhost:8081/api/v1/admin/mangas/reference/' + mangaId

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
                return json
            }
        }

        const fetchItem = async () => {
            let apiUrl = 'http://localhost:8081/api/v1/admin/comments?'
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
                for (var item of json) {
                    item.href = '/admin/comment/show/' + item.id
                    item.timeCreated = timeConverter(item.timeCreated)
                    item.user = await fetchUserReference(item.user)
                    item.manga = await fetchMangaReference(item.manga)
                }
                let fetchItemCount = response.headers.get('Content-Range')
                setItemCount(fetchItemCount)
                let totalItemCount = fetchItemCount.split('/')[1]
                setPageCount(Math.ceil(parseInt(totalItemCount) / itemPerPage))
                console.log(json)
                // setItemList(json)
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
                searchFieldList={searchFieldList}
                itemCount={itemCount}
                paginateSelectorList={paginateSelectorList}
                sortFieldList={sortFieldList}
                sorttypes={sorttypes} />
            <Grid container spacing={5}>
                {itemList.map((item) => (
                    <Grid item xs={6}>
                        <CommentItemCard 
                            mangaCover={item.manga&&item.manga.cover}
                            mangaTitle={item.manga&&item.manga.title}
                            userAvatar={item.user&&item.user.avatar}
                            userDisplayname={item.user&&item.user.displayname}
                            content={item.content}
                            updateTime={item.timeCreated}
                            href={item.href}
                        />
                    </Grid>
                ))}
            </Grid>
        </ListAdminWrapper>
    )
}

export default CommentAdminList