import React from 'react';
import { useState } from 'react';
import { Grid } from '@mui/material';
import ListAdminWrapper from '../component/listadminwrapper/ListAdminWrapper';
import ListAdminHeader from '../component/listadminheader/ListAdminHeader';
import { useEffect } from 'react';
import ReportItemCard from './reportitemcard/ReportItemCard';
import { useSearchParams } from 'react-router-dom';
import { timeConverter } from '../../../../common/Date';
import { useSelector } from 'react-redux';

const ReportAdminList = (props) => {
    const itemPerPage = 6
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
        const fetchUserReference = async (userId) => {
            let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/users/reference/' + userId

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
                return json
            }
        }

        const fetchChapterReference = async (chapterId) => {
            let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/chapters/reference/' + chapterId

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
                return json
            }
        }

        const fetchItem = async () => {
            let apiUrl = process.env.REACT_APP_API_ENDPOINT+'/admin/reports?'
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
                    'Authorization': sessionkey,
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                // convert data to json
                const json = await response.json();
                for (var item of json) {
                    item.href = '/admin/report/show/' + item.id
                    item.timeCreated = timeConverter(item.timeCreated)
                    item.user = await fetchUserReference(item.user)
                    item.chapter = await fetchChapterReference(item.chapter)
                }
                let fetchItemCount = response.headers.get('Content-Range')
                setItemCount(fetchItemCount)
                let totalItemCount = fetchItemCount.split('/')[1]
                setPageCount(Math.ceil(parseInt(totalItemCount) / itemPerPage))
                console.log(json)
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
                searchFieldList={searchFieldList}
                itemCount={itemCount}
                paginateSelectorList={paginateSelectorList}
                sortFieldList={sortFieldList}
                sorttypes={sorttypes} />
            <Grid container spacing={5}>
                {itemList.map((item) => (
                    <Grid item xs={12} md={6}>
                        <ReportItemCard
                            chapterCover={item.chapter&&item.chapter.cover}
                            chapterTitle={item.chapter&&item.chapter.title}
                            userAvatar={item.user&&item.user.avatar}
                            userDisplayname={item.user&&item.user.displayname}
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