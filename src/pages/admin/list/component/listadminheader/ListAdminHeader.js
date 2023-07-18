import React from 'react';
import { Button, FormControl, InputAdornment, InputBase } from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import './ListAdminHeader.css';

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
    return (
        <>
            <div className='admin-list-searchbar-wrapper'>
                <select className='search-field-selector' >
                    {props.searchFieldList.map((searchField) => <option value={searchField.key}>{searchField.value}</option>)}
                </select>
                <div className='admin-search-text-input'>
                    <FormControl variant="standard" fullWidth>
                        <InputBase className='search-text-input'
                            sx={searchTextInputStyle}
                            placeholder="Filter"
                            // value={searchValue}
                            // fullWidth
                            // onChange={(e) => { setSearchValue(e.target.value) }}
                            // onKeyDown={handleKeyPress}
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
                    <Button variant="contained" startIcon={<Add />} sx={addBtnStyle}>
                        Thêm
                    </Button> : <></>}
            </div>
            <div className='admin-list-paginate-wrapper'>
                <p>Hiển thị {props.itemCount}</p>
                <p>Trang
                    <select className='admin-paginate-selector'>
                        {props.paginateSelectorList.map((page) => <option value={page}>{page}</option>)}
                    </select>
                </p>
            </div>
            <div className='admin-list-sort-wrapper'>
                <p>Sắp xếp theo:
                    <select className='admin-list-sortfield'>
                        {props.sortFieldList.map((field) => <option value={field.key}>{field.value}</option>)}
                    </select>
                    <select className='admin-list-sorttype'>
                        {props.sorttypes.map((sorttype) => <option value={sorttype.key}>{sorttype.value}</option>)}
                    </select>
                </p>
            </div>
        </>
    )
}

export default ListAdminHeader