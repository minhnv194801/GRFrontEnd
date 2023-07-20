import React from 'react';
import { Button, FormControl, InputAdornment, InputBase } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import './ListAdminHeader.css';
import { useSearchParams } from 'react-router-dom';

const searchTextInputStyle = {
    'borderRadius': '25px',
    'backgroundColor': '#fff',
    'boxShadow': '0px 1px',
}

const addBtnStyle = {
    'color': '#fff',
    'backgroundColor': '#0099FF',
    'borderRadius': '25px',
    'fontWeight': 'bold',
    "&:hover": { backgroundColor: "#66C2FF" },
}

//TODO: connect to backend
const ListAdminHeader = (props) => {
    const [searchParams] = useSearchParams()

    var searchField = searchParams.get('searchfield')?searchParams.get('searchfield'):''
    var searchValue = searchParams.get('searchvalue')?searchParams.get('searchvalue'):''
    var page = searchParams.get('page')?searchParams.get('page'):''
    var sortField = searchParams.get('sortfield')?searchParams.get('sortfield'):''
    var sortType = searchParams.get('sorttype')?searchParams.get('sorttype'):''

    const getPathName = () => {
        return window.location.pathname+"?searchfield="+searchField+"&searchvalue="+searchValue+"&page="+page+"&sortfield="+sortField+"&sorttype="+sortType
    }

    const handleSearchFieldSelectorChange = (e) => {
        searchField = e.target.value
        window.location.href = getPathName()
    }

    const handleSearchTextFieldChange = (e) => {
        searchValue = e.target.value
    }

    const handleSearchTextFieldSubmit = (e) => {
        if (e.keyCode === 13) {
            searchValue = e.target.value
            window.location.href = getPathName()
        }
    }

    const handlePageChange = (e) => {
        page = e.target.value
        window.location.href = getPathName()
    }

    const handleSortFieldSelectorChange = (e) => {
        sortField = e.target.value
        window.location.href = getPathName()
    }

    const handleSortTypeSelectorChange = (e) => {
        sortType = e.target.value
        window.location.href = getPathName()
    }

    return (
        <>
            <div className='admin-list-searchbar-wrapper'>
                <select className='search-field-selector' defaultValue={searchField} onChange={handleSearchFieldSelectorChange}>
                    {props.searchFieldList.map((searchField) => <option value={searchField.key}>{searchField.value}</option>)}
                </select>
                <div className='admin-search-text-input'>
                    <FormControl variant="standard" fullWidth>
                        <InputBase className='search-text-input'
                            sx={searchTextInputStyle}
                            placeholder="Filter"
                            defaultValue={searchValue}
                            onChange={handleSearchTextFieldChange}
                            onKeyDown={handleSearchTextFieldSubmit}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            } />
                    </FormControl>
                </div>
            </div>
            <div className='admin-list-create-btn-wrapper'>
                {props.createable ?
                    <Button variant="contained" startIcon={<Add />} sx={addBtnStyle} onClick={(e) => window.location.href=window.location.pathname+'/create'}>
                        Thêm
                    </Button> : <></>}
            </div>
            <div className='admin-list-paginate-wrapper'>
                <p>Hiển thị {props.itemCount}</p>
                <p>Trang
                    <select className='admin-paginate-selector' value={page} onChange={handlePageChange}>
                        {props.paginateSelectorList.map((page) => <option value={page}>{page}</option>)}
                    </select>
                </p>
            </div>
            <div className='admin-list-sort-wrapper'>
                <p>Sắp xếp theo:
                    <select className='admin-list-sortfield' defaultValue={sortField} onChange={handleSortFieldSelectorChange}>
                        {props.sortFieldList.map((field) => <option value={field.key}>{field.value}</option>)}
                    </select>
                    <select className='admin-list-sorttype' defaultValue={sortType} onChange={handleSortTypeSelectorChange}>
                        {props.sorttypes.map((sorttype) => <option value={sorttype.key}>{sorttype.value}</option>)}
                    </select>
                </p>
            </div>
        </>
    )
}

export default ListAdminHeader