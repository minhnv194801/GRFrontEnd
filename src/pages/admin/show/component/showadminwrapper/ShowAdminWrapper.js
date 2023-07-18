import React from 'react';
import './ShowAdminWrapper.css';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';

const deleteIconStyle = {
    'width': '50px',
    'height': '50px',
    'color': 'red',
}

const deleteBtnStyle = {
    'color': 'red',
    'fontSize': '24px',
    'fontWeight': 'bold',
}

//TODO: connect to backend
const ShowAdminWrapper = (props) => {
    return (
        <div>
            <div className='show-admin-header-wrapper'>
                <Button startIcon={<Delete sx={deleteIconStyle} />} sx={deleteBtnStyle}>
                    DELETE
                </Button>
            </div>
            <div className='show-admin-wrapper'>
                {props.children}
            </div>
        </div>
    )
}

export default ShowAdminWrapper